const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const usersRouter = require('./src/routes/users')
const friendsRouter = require('./src/routes/friends')
const db = require('./src/configs/db')
const ejs = require('ejs')
const path = require('path')


const app = express()
app.use(bodyParser.json())
app.use(express.static('src/img'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())
app.use('/api/users',usersRouter)
app.use('/api/friends',friendsRouter)
app.set('views', path.join(__dirname,'src/views'))
app.set('view engine', 'ejs')
app.use(express.static('src/views'))

const server = http.createServer(app)
const io = socketio(server)

//socket io
io.on('connection', (socket) => {
    socket.on('get-all-users', () => {
        db.query('SELECT * FROM users', (err,result) => {
            if(err) {
                console.log(err)
            }else{
                io.emit('list-users',result)
            }
        })
    })

    socket.on('delete-message', (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM message WHERE id='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    })

    socket.on('send-message', payload => {
        const message = `${payload.message}`
        db.query(`INSERT INTO message (sender,receiver,message) VALUES ('${payload.sender}','${payload.receiver}','${message}')`,(err,result) => {
            if(err){
                console.log(err)
            }else{
                io.to(payload.receiver).emit('list-messages',{
                    sender: payload.sender,
                    message: message,
                    receiver: payload.receiver
                })
            }
        })
})

//history get
    socket.on('get-history-message',payload => {
        db.query(`SELECT * FROM message WHERE (sender='${payload.sender}' AND receiver='${payload.receiver}') OR (sender='${payload.receiver}' AND receiver='${payload.sender}')`,(err,result) => {
            if(err){
                console.log(err)
            }else{
            //    console.log(result)
                io.to(payload.sender).emit('history-list-messages',result)
            }
        })
    })

    socket.on('join-room', (payload) => {
        socket.join(payload.user)
    })
})
//

const PORT = 3008
server.listen(PORT , () => {
    console.log(`App Running on Port ${PORT}`)
})