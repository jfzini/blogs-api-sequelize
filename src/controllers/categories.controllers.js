const { CategoriesService } = require('../services');
const statusHTTP = require('./utils/statusHTTP');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const result = await CategoriesService.createCategory(name);
  res.status(statusHTTP[result.status]).json(result.data);
};

const findAllCategories = async (_req, res) => {
  const result = await CategoriesService.findAllCategories();
  res.status(statusHTTP[result.status]).json(result.data);
};

module.exports = {
  createCategory,
  findAllCategories,
};