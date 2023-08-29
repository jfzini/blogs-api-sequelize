const express = require('express');
const { LoginController } = require('../controllers');
const { LoginMiddlewares } = require('../middlewares');

const LoginRouter = express.Router();

LoginRouter.post('/', LoginMiddlewares.validateLoginFields, LoginController.validateLogin);

module.exports = LoginRouter;