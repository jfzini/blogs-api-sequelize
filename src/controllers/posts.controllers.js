const { PostsService, CategoriesService } = require('../services');
const statusHTTP = require('./utils/statusHTTP');

const createPost = async (req, res) => {
  const { categoryIds, ...post } = req.body;
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

module.exports = {
  createPost,
  findAllPosts,
};
