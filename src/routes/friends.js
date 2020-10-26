const express = require('express')
const friendsController = require('../controllers/friends')
const {authentication, authorization} = require('../helpers/auth')

const router = express.Router();

router
.post('/add', authentication, authorization, friendsController.addFriends)
.get('/getfriends/:username', authentication, authorization, friendsController.getFriends)

module.exports = router;