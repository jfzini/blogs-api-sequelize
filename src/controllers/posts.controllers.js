const { PostsService, CategoriesService } = require('../services');
const statusHTTP = require('./utils/statusHTTP');

const createPost = async (req, res) => {
  const { categoryIds, ...post } = req.body;
  const { id } = req.user;
  post.userId = id;
  const categoriesPromisses = categoryIds.map(async (categoryId) => {
    const { status } = await CategoriesService.findCategoryById(categoryId);
    return status;
  });

  const categoriesStatus = await Promise.all(categoriesPromisses);
  if (categoriesStatus.some((status) => status === 'NOT_FOUND')) {
    return res
      .status(statusHTTP.BAD_REQUEST)
      .json({ message: 'one or more "categoryIds" not found' });
  }
  const result = await PostsService.createPost(post, categoryIds);
  return res.status(statusHTTP[result.status]).json(result.data);
};

const findAllPosts = async (_req, res) => {
  const result = await PostsService.findAllPosts();
  return res.status(statusHTTP[result.status]).json(result.data);
};

const findPostById = async (req, res) => {
  const { id } = req.params;
  const result = await PostsService.findPostById(id);
  return res.status(statusHTTP[result.status]).json(result.data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const result = await PostsService.updatePost(id, req.body, req.user);
  return res.status(statusHTTP[result.status]).json(result.data);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const result = await PostsService.deletePost(id, req.user);
  if (result.status === 'NO_CONTENT') {
    return res.status(statusHTTP[result.status]).end();
  }
  return res.status(statusHTTP[result.status]).json(result.data);
};

const findPostByQuery = async (req, res) => {
  const { q } = req.query;
  const result = await PostsService.findPostByQuery(q);
  return res.status(statusHTTP[result.status]).json(result.data);
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  updatePost,
  deletePost,
  findPostByQuery,
};
