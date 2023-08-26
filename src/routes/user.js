const express = require('express');
const { UserController } = require('../controllers');
const { UserMiddlewares, TokenMiddlewares } = require('../middlewares');

const UserRouter = express.Router();

UserRouter.post('/', UserMiddlewares.createUser, UserController.createUser);
UserRouter.use(TokenMiddlewares.checkToken);
UserRouter.get('/', UserController.findAllUsers);

module.exports = UserRouter;