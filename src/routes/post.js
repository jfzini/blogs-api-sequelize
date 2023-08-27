const express = require('express');
const { TokenMiddlewares, PostsMiddlewares } = require('../middlewares');
const { PostsController } = require('../controllers');

const PostRouter = express.Router();

PostRouter.use(TokenMiddlewares.checkToken);

PostRouter.get('/', PostsController.findAllPosts);
PostRouter.get('/:id', PostsController.findPostById);
PostRouter.post('/', PostsMiddlewares.validateCreation, PostsController.createPost);
PostRouter.put('/:id', PostsMiddlewares.validateUpdate, PostsController.updatePost);
PostRouter.delete('/:id', PostsController.deletePost);

module.exports = PostRouter;
