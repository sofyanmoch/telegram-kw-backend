const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/users')
const {authentication,authorization} = require('../helpers/auth')
const upload = require('../helpers/upload')

router
.post('/register',usersControllers.register)
.post('/login',usersControllers.login)
.get('/verification/:token', usersControllers.verify)
.get('/getdetail/:id',authentication,authorization,usersControllers.getDetail)
.patch('/edit/:id',upload.single('image'), authentication,authorization, usersControllers.updateUsers)

module.exports = router