const express = require('express');
const { LoginRouter, UserRouter, CategoriesRouter } = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', LoginRouter);
app.use('/user', UserRouter);
app.use('/categories', CategoriesRouter);

module.exports = app;
