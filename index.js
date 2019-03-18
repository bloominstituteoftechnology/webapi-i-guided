const express = require('express');

const server = express();

// Express segment (middleware) that will parse JSON request
// Parse the raw request and create a body property of the request
server.use(express.json());

// Express segment that creates an API endpoint
server.get('/', (req, res) => {
  // right now we don't care about the Request, we just want to send Response right away
  res.json({ success: true })
});

server.get('/:name', (req, res) => {
  res.json({ success: true })
});

// Using REQ.BODY to transmit information
server.post('/', (req, res) => {
  res.json({ success: true })
});

// Using REQ.PARAMS to transmit information
// http://127.0.0.1:4000/josh
// server.post('/:name', (req, res) => {
//   const { name } = req.params;
//   res.json({ message: `User ${name} created` })
// });

// Using REQ.QUERY to transmit information
// http://127.0.0.1:4000/josh?foo=bar&search=bar
server.post('/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `User ${name} created` })
});

server.listen(4000, () => console.log(`Listening on port 4000`));
