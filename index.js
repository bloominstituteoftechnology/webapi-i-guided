const express = require ('express');
const server = express();
const port = 9000;

server.use('/api/hubs',hubs);
server.get('/')