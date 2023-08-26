const express = require('express');
const { LoginController } = require('../controllers');

const LoginRouter = express.Router();

LoginRouter.post('/', LoginController.validateLogin);

module.exports = LoginRouter;