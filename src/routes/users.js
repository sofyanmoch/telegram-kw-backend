const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/users')

router
.post('/register',usersControllers.register)
.post('/login',usersControllers.login)

module.exports = router