const express = require("express");
// the same as import express from "express"; ES2015 Modules

const db = require('./data/db.js') // CommonJS Modules


// creates an express application using the express module
const server = express();

// wire up global middleware 
server.use(express.json()); // teaches express how to parse JSON from the body of the request. 

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/now", (req, res) => {
  let date = new Date();
  res.send(`The date is: ${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}
  The current time is: ${date.getHours() % 12}:${date.getMinutes()}
  `);
})

// the R in CRUD
server.get('/hubs', (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      // 200-299 success
      // 300-399 redirect
      // 400-499 client error
      // 500-599 server error
      res.status(200).json(hubs);
    })
    .catch(error => {
      // handle it
      res.status(500).json({ message: 'error retrieving hubs' });
    });
});

// the C in CRUD
server.post('/hubs', (req, res) => {
  const hubInfo = req.body;
  console.log('hub information', hubInfo);

  db.hubs
    .add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json({ message: 'error creating the hub' });
    });
});


// the D in CRUD
server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  db.hubs
    .remove(id)
    .then(deleted => {
      res.status(204).end(); // tells the client the request is done
    })
    .catch(error => {
      res.status(500).json({ message: 'error deleting the hub' });
    });
});

// the U in CRUD
server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.hubs
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'hub not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating the hub' });
    });
});



server.listen(4000, () => {
  console.log("\n** API up and running on port 4000 **");
});
// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
