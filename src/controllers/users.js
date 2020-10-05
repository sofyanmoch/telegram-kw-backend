const usersModel = require('../models/users')
const db = require('../configs/db')
const {success,failed,tokenResult} = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../helpers/env')
const { getEmail } = require('../models/users')

module.exports = {
    register: async(req,res) => {
        try {
            const body = req.body
            const salt = await bcrypt.genSalt(10)
            const hashPw = await bcrypt.hash(body.password,salt)
            const data = {
                email: body.email,
                username: body.username,
                password: hashPw
            }
            const email = await getEmail(data.email)
            if(email.length > 0 ){
                failed(res,[],'Email already exist')
            }
            else {
            usersModel.register(data)
            .then((result) => {
                tokenResult(res,result,'register success')
            })
        }
        } catch (err) {
            failed(res,[],err.message)
        }
    },
    login: async(req,res) => {
        try {
            const body = req.body
            usersModel.login(body)
            .then(async(result) => {
                const results = result[0]
                const password= results.password
                const isMatch = await bcrypt.compare(body.password,password)
                if(isMatch) {
                    jwt.sign({
                        email: results.email,
                    }, secretKey, {expiresIn: 3600},
                    (err,token) => {
                        if(err) {
                            console.log(err)
                        }else{
                            const id = results.id
                            const refreshToken = jwt.sign({id}, 'REFRESH17')
                            usersModel.updRefreshToken(refreshToken,id).then(() => {
                                const data = {
                                    token: token,
                                    refreshToken: refreshToken
                                }
                                tokenResult(res,data,'Login success')
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    })
                }
                else {
                    failed(res,[],'email atau password salah')
                }
            })
        } catch (err) {
            failed(res,[],err.message)
        }
    }
}