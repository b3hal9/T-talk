const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const socket = require('socket.io')

const server = http.createServer(app)

app.use(express.static(path.join(__dirname,('./public'))))




const io = socket(server)

io.on('connection', (socket)=>{
    console.log('socket connection established.!',socket.id)
    
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data)
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)

    })
    socket.on('disconnect', ()=>{

        socket.broadcast.emit('disconnected')
       
    });
})




















const PORT = process.env.PORT || 5000
server.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}.`))