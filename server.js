const express = require('express');
// const logger = require('morgan');
const bodyParser = require('body-parser');
const server = express();

const http = require ('http').Server(server);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

// server.use(logger(`combined`));
server.use(express.static(__dirname))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

const dbUrl = 'mongodb://korina:tsinelas100@ds155073.mlab.com:55073/node-chat-lee'

//model. args ==== Model, schema
const Message = mongoose.model('Message', {
    name: String,
    message: String
})

server.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})


server.post('/messages', async (req, res) => {
    try {
        const message = new Message(req.body)
        const savedMessage = message.save()
        console.log('saved')
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
        //logger, shutdown a resource
    } 
})

io.on('Connection', (socket) => {
    console.log('user connected')
})

mongoose.connect(dbUrl, {useNewUrlParser: true}, (err) => {
    console.log('mongo db connection', err)
})

const port = process.env.PORT || 4000
http.listen(port, () => console.log(`API running on port ${port}`))
