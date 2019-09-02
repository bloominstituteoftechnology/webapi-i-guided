// import express from 'express'
const express = require('express');
//import hubs-model file
const Hubs = require('./data/hubs-model.js')

const server = express();
// no code for handling http GET request to the URL

// adding adta
server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello baby');
})
// see a list of hubs 
server.get('/hubs', (req, res) =>{
    // .find() returns a promise, need .then() . catch()
    Hubs.find()
    .then(hubs => {
    // .json will convert the data pass to JSON
    // also tells the client we'r sending JSON through and HTTP header
        res.status(200).json(hubs)
    })
    .catch(error => {
        res.status(500).json({ message: 'error getting the list of hubs'})
    })
})

// create a Hub
server.post('/hubs', (req, res) => {
    const hubInfo = req.body;
    console.log('hubInfo', hubInfo)
    Hubs.add(hubInfo)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(error => {
        res.status(500).json({ error: 'error adding the hub'})
    })
})

// delete a Hub
server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
    .then(hub => {
        res.status(200).json({ message: 'hub deleted'})
    })
    .catch(error => {
        res.status(500).json({ error: 'error removing the hub'})
    })
})

// Update a Hub
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const change = req.body;
    Hubs.update(id, change)
    .then(updeted => {
        if(updeted) {
            res.status(200).json(updeted)
        } else {
            res.status(404).json({ message: 'hub not found'})
        }
       
    })
    .catch(error => {
        res.status(500).json({ error: 'error updating the hub'})
    })
})

const port = 8000;
server.listen(port, () => console.log('api running'));