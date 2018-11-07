const express = require('express');
// const logger = require('morgan');
const bodyParser = require('body-parser');
const server = express();

const http = require ('http').Server(server);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

server.use(express.json());
// server.use(logger(`combined`));
server.use(express.static(__dirname))
server.use(bodyParser.urlencoded({extended:false}))

const dbUrl = 'mongodb://korina:tsinelas100@ds155073.mlab.com:55073/node-chat-lee'

const messages = [
    {
        name: 'Lee',
        message: 'Nu nahh',
    },
    {
        name: 'Marian',
        message: 'Story op my layp',
    }
]

server.get('/messages', (req, res) => {
    res.send(messages);
})

server.post('/messages', (req, res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('Connection', (socket) => {
    console.log('user connected')
})

mongoose.connect(dbUrl, {useNewUrlParser: true}, (err) => {
    console.log('mongo db connection', err)
})

const port = 4000;
http.listen(port, () => console.log(`API running on port ${port}`))
