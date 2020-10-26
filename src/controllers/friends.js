const friendsModel = require('../models/friends')
const {success, failed} = require('../helpers/response')

module.exports = {
    addFriends: (req,res) => {
        try {
            const body = req.body
            friendsModel.addFriends(body)
            .then((result) => {
                const data = {
                    user: body.friend,
                    friend: body.user
                }
                friendsModel.addFriends(data)
                .then(() => {

                }).catch((err) => {
                    console.log(err)
                })
                success(res, result, 'Friend is added')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch {
            failed(res, [], 'Internal server error')
        }
    },
    getFriends: (req, res) => {
        try {
            const username = req.params.username
            friendsModel.getFriends(username)
            .then((result) => {
                success(res, result, 'Here is your friends')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error')
        }
    }
}