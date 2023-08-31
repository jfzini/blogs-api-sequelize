const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const CategoryModel = require('../../../src/models/Category');

chai.use(sinonChai);
const { expect } = chai;

describe('Category model should work as expected', function () {
  const Category = CategoryModel(sequelize, dataTypes);
  const category = new Category();

  describe('should have model name "Category"', function () {
    checkModelName(Category)('Category');
  });

  describe('should have properties', function () {
    const properties = ['id', 'name'];
    properties.forEach(checkPropertyExists(category));
  });
});
