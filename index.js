const express = require('express');
// express = lightweight
// routers -> organizing our endpoints
// middleware -> allows us to expand and customize

//const db = require('./data/db.js');

const server = express();
//const { hubs } = db;

// creating endpoints
// I want to make something available in case anyone needs it
server.use(express.json()); // makes post and put work
  //console.log('inside the get request');
  // specify a data type
  // set a status code
  // send a response
  server.get('/', (req, res) => {
    res.send('<h2>Hello World</h2>');
  });

// request handler for /now that sends back the current date in string form
server.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

//Create
server.post('/hubs', (req, res) => {
  //read data for hub
  const hubInfo = req.body;
  //add the hub to db
  db.hubs
    .add(hubInfo)
    //tell client what happened
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json({ message: 'error creating hub' });
    });
});

//Read
server.get('/hubs', (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      //handle error
      res.status(500).json({ message: 'error retrieving hubs' });
    });
});

//Update
server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.hubs
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating hub' });
    });
});

//Delete
server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  db.hubs
    .remove(id)
    .then(deleted => {
      res.status(204).end(); //end tells client that request is finished.
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting hubs' });
    });
});

// listening
server.listen(9090, () => {
  console.log('Listening on port 9090');
});
