const express = require('express')
const router = express.Router()

router
.post('/register',usersControllers.register)
.post('/login',usersControllers.login)

module.exports = router