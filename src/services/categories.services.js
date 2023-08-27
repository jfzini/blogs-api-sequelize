const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return { status: 'CREATED', data: category };
};

const findAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCESSFUL', data: categories };
};

const findCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    return { status: 'NOT_FOUND', data: { message: 'Category does not exist' } };
  }
  return { status: 'SUCESSFUL', data: category };
};

module.exports = {
  createCategory,
  findAllCategories,
  findCategoryById,
};