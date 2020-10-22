const usersModel = require('../models/users')
const db = require('../configs/db')
const {success,failed,tokenResult} = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../helpers/env')
const { getEmail, getUsername } = require('../models/users')
const {emailSend} = require('../helpers/Mail')
const upload = require('../helpers/upload')
const { response } = require('express')
const fs = require('fs')

module.exports = {
    register: async(req,res) => {
        try {
            const body = req.body
            const salt = await bcrypt.genSalt(10)
            const hashPw = await bcrypt.hash(body.password,salt)
            const data = {
                email: body.email,
                username: body.username,
                password: hashPw,
                image: "404P.png"
            }
            const email = await getEmail(data.email)
            const username = await getUsername(data.username)
            if(email.length > 0 ){
                failed(res,[],'Email already exist')
            }
            else if(username.length > 0) {
                failed(res,[],'Username already exist')
            }
            else {
            usersModel.register(data)
            .then((result) => {
                tokenResult(res,result,'register success')
                const token = jwt.sign({email: body.email}, secretKey)
                emailSend(data.email,token)
            }).catch((err)=>{
                failed(res,[],err.message)
            })
        }
        } catch (err) {
            failed(res,[],err.message)
        }
    },
    verify: async(req,res) => {
        const token = req.params.token
        if(token){
            jwt.verify(token, secretKey, async (err,decode)=>{
                if(err) {
                    failed(res,[],err.message)
                } else {
                    try {
                        const data = jwt.decode(token)
                        const email = data.email
                        const result = await usersModel.update(email)
                        if(result){
                            res.render("verify/email")
                        } else {
                            res.json({
                                message: 'error Activated'
                            })
                        }
                    } catch (err) {
                        failed(res, [], err.message)
                    }
                }
            })
        }
},
    login: async(req,res) => {
        try {
            const body = req.body
            usersModel.login(body)
            .then(async(result) => {
                const results = result[0]
                if(!results){
                    failed(res,[],'username not found')
                } else if (results.user_status === 0) {
                    failed(res,[],'Please Activate Email First')
                }
                else{
                const id = results.id
                const username = results.username
                const email = results.email
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
                                    id: id,
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
                    failed(res,[],'Wrong Password')
                }
            }
            })
        } catch (err) {
            failed(res,[],err.message)
        }
    },
    getDetail: (req,res) => {
        try{
            const id = req.params.id
            usersModel.getDetail(id)
            .then((result)=>{
                success(res,result,'Get detail users success')
            })
        } catch{
            failed(res,[],'internal server error')
        }
    },
    updateUsers: (req,res) => {
        try {
            const body = req.body
            upload.single('image')(req,res, (err) => {
                if (err) {
                    if (err.code === `LIMIT_FIELD_VALUE`) {
                        failed(res, [], `Image size is to big`)
                    } else {
                        failed(res, [], err)
                    }
                } else {
                    const id = req.params.id
                    usersModel.getDetail(id).then((response) => {
                        const imgOld = response[0].image
                        body.image = !req.file? imgOld : req.file.filename
                        if(body.image !== imgOld) {
                            if(imgOld !== '404.png') {
                                fs.unlink(`src/img/${imgOld}`, (err) => {
                                    if(err) {
                                        failed(res, [], err.message)
                                    } else {
                                        usersModel.updateUsers(body, id)
                                        .then((result) => {
                                            success(res,result,'Users Updated')
                                        }).catch((err) => {
                                            failed(res, [], err.message)
                                        })
                                    }
                                })
                            }
                        } else {
                            usersModel.updateUsers(body, id)
                            .then((result) => {
                                success(res, result, 'Users Updated')
                            }).catch((err) => {
                                failed(res, [], err.message)
                            })
                        }
                    })
                }
            })
        } catch {
            failed(res,[],'Internal server error')
        }
    }
}