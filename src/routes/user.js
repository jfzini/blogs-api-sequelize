const express = require('express');
const { UserController } = require('../controllers');
const { UserMiddlewares } = require('../middlewares');

const UserRouter = express.Router();

UserRouter.post('/', UserMiddlewares.createUser, UserController.createUser);

module.exports = UserRouter;