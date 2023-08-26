const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return { status: 'CREATED', data: category };
};

const findAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCESSFUL', data: categories };
};

module.exports = {
  createCategory,
  findAllCategories,
};