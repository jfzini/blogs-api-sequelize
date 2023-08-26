const express = require('express');
const { LoginRouter, UserRouter } = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', LoginRouter);
app.use('/user', UserRouter);

module.exports = app;
