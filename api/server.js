const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../routers/authRouter');
const usersRouter = require('../routers/usersRouter');

const server = express();

server.use(helmet());
server.use(express.json);
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send('We out here!');
});

module.exports = server;