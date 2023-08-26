const express = require('express');
const { LoginRouter } = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', LoginRouter);

module.exports = app;
