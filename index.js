const express = require('express');
const db = require('./data/hubs-model');

const server = express();

server.listen(4000, () => {
    console.log('=== server listening on port 4000 ===');
})

server.get('/', (req, res) => {
    res.send('hello world...');
})

//this is the Read method for hubs
server.get('/hubs', (req, res) => {
    db.find()
        .then((hubs) => {
            res.status(200).json(hubs);
        })
        .catch((err) => {
            res.status(500).json({
                message: err,
                success: false
            })
        })
})
// console.log('hello world');