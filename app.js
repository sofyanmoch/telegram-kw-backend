const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const usersRouter = require('./src/routes/users')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())
app.use('/api/users',usersRouter)

const server = http.createServer(app)
const io = socketio(server)

//

//

const PORT = 3008
server.listen(PORT , () => {
    console.log(`App Running on Port ${PORT}`)
})