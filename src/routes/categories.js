const express = require('express');
const { TokenMiddlewares, CategoriesMiddlewares } = require('../middlewares');
const { CategoriesController } = require('../controllers');

const CategoriesRouter = express.Router();

CategoriesRouter.use(TokenMiddlewares.checkToken);

CategoriesRouter.post('/', CategoriesMiddlewares.validateName, CategoriesController.createCategory);

module.exports = CategoriesRouter;
