/* my first server! */

const express = require('express');

const server = express();
server.use(express.json());

const portnum = 4000;

const db = require('./data/db.js');
const hubs = db.hubs;


server.listen(portnum, () => {
	console.log(`listening on port ${portnum}`);
});


server.get('/', (req, res) => {
	// interprets input to see what to return
	// default status code = 200
	console.log('serving a get request');
	res.send('<h1>Hello, World!</h1>');
});


server.get('/now', (req, res) => {
	// serve up the current time
	const current = new Date();
	res.send(`The time is: ${current}`);
});



server.get('/hubs', (req, res) => {
	hubs.find()
		.then(hubs => {
			res.json(hubs);
		})
		.catch(({code, message}) => {
			res.status(code).json({err: message});
		});
});


server.delete('/hubs/:id', (req, res) => {
	const id = req.params.id;

	hubs.remove(id)
		.then(removedHub => {
			res.json(removedHub);
		})
		.catch(({code, message}) => {
			res.status(code).json({err: message});
		});
});


server.post('/hubs', (req, res) => {
	const newhub = req.body;

	hubs.add(newhub)
		.then(addedHub => {
			res.status(201).json(addedHub);
		})
		.catch(({code, message}) => {
			res.status(code).json({err: message});
		});
});


server.get('/hubs/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);

	hubs.findById(id)
		.then(hub => {
			res.json(hub);
		})
		.catch(({code, message}) => {
			res.status(code).json({err: message});
		});
});



