const express = require('express');
const db = require('./data/db');

const server = express();

const port = 5000;

server.get('/', (req, res)=> {
    // res.send('Hello My Ninja');
    const now = new Date().toISOString();
    res.send(now);
});

server.get('/hubs', (req, res)=>{
    const hubs = db.hubs
        .find()
        .then( hubs => {
            res.status(200).json(hubs)
        })
        .catch(({code, message}) =>{
            res.status(code).json({
                success: false,
                message
            })
        })
    }
)

server.get('/hubs/:id', (req, res)=>{
    const id = req.params.id;
        db.hubs
            .findById(id)
            .then((id) => {
                if(id){
                    res.status(200).json({success: true, id})
                } else {
                    res.status(404).json({success: false, message: "could not find that id"})
                }
            })
            .catch(({code, message})=>{
                res.status(code).json({success: false, message})
            })

})

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;
        db.hubs
        .remove(id)
        .then(deleted => {
            res.status(204).end()
        })
        .catch(({ code, message}) => {
            res
            .status(code)
            .json({
                success: false,
                message
            })
        })
})

server.post('/hubs', (req, res)=>{
    const hubInfo = req.body;
    
    db.hubs
        .add(hubInfo)
        .then( hub =>{
            res.status(201).json({success: true, hub})
        })
        .catch(({code, message})=>{
            res
                .status(code)
                .json({success: false, message })
        })
})

server.listen(port, () => {
    console.log(`server is running on ${port}`);
});

