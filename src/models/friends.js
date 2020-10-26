const db = require('../configs/db')

module.exports = {
    addFriends: (data) => {
        return new Promise((resolve,reject) => {
            db.query(`INSERT into friends SET ? `, data, (err,result) => {
                err? reject(new Error(err)) : resolve(result)
            })
        })
    },
    getFriends : (username) => {
        return new Promise ((resolve, reject) => {
            db.query(`SELECT * FROM friends WHERE user = '${username}'`, (err, result) => {
                if(err) {
                    reject (new Error(err))
                } else {
                    resolve (result)
                }
            })
        })
    }
}