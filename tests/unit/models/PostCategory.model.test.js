const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const PostCategoryModel = require('../../../src/models/PostCategory');

chai.use(sinonChai);
const { expect } = chai;

describe('PostCategory model should work as expected', function () {
  const PostCategory = PostCategoryModel(sequelize, dataTypes);
  const postCategory = new PostCategory();

  describe('should have model name "PostCategory"', function () {
    checkModelName(PostCategory)('PostCategory');
  });

  describe('should have properties', function () {
    const properties = ['postId', 'categoryId'];
    properties.forEach(checkPropertyExists(postCategory));
  });

  describe('should have associations', function () {
    const BlogPost = { belongsToMany: sinon.spy() };
    const Category = { belongsToMany: sinon.spy() };

    before(function () {
      PostCategory.associate({ BlogPost, Category });
    });

    it('defined a belongsToMany association with PostCategory', function () {
      expect(BlogPost.belongsToMany).to.have.been.calledWith(Category);
      expect(Category.belongsToMany).to.have.been.calledWith(BlogPost);
    });
  });
});
