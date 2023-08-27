const LoginMiddlewares = require('./login.middlewares');
const TokenMiddlewares = require('./token.middlewares');
const UserMiddlewares = require('./user.middlewares');
const CategoriesMiddlewares = require('./categories.middlewares');
const PostsMiddlewares = require('./posts.middlewares');

module.exports = {
  LoginMiddlewares,
  TokenMiddlewares,
  UserMiddlewares,
  CategoriesMiddlewares,
  PostsMiddlewares,
};
