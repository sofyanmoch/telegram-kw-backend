const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/users')
const {authentication,authorization} = require('../helpers/auth')

router
.post('/register',usersControllers.register)
.post('/login',usersControllers.login)
.get('/verification/:token', usersControllers.verify)
.get('/getdetail/:id',authentication,authorization,usersControllers.getDetail)

module.exports = router