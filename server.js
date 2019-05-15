const express = require('express');

const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

const server = express();


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

// Router
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;
