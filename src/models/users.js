const db = require('../configs/db')

module.exports = {
    register: (data) => {
        return new Promise((resolve,reject) => {
            db.query(`INSERT into users SET?`,data,(err,result) => {
                err? reject(new Error(err)) : resolve(result)
            })
        })
    },
    login: (data) => {
        return new Promise((resolve,reject)=>{
                db.query(`SELECT * from users where username = '${data.username}' OR email = '${data.email}'`,(err,result)=>{
                    err ? reject(new Error(err)) : resolve(result)
                })
            })
        },
    updRefreshToken: (token,id) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET refreshToken = '${token}' WHERE id = '${id}'`,(err,result)=> {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getEmail: (email) => {
        return new Promise((resolve,reject) => {
            db.query(`SELECT * from users WHERE email = '${email}'`,(err,result)=>{
                err?reject(new Error(err)) : resolve(result)
            })
        })
    }
}