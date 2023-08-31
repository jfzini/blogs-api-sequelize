const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const BlogPostModel = require('../../../src/models/BlogPost');

chai.use(sinonChai);
const { expect } = chai;

describe('BlogPost model should work as expected', function () {
  const BlogPost = BlogPostModel(sequelize, dataTypes);
  const blogPost = new BlogPost();

  describe('should have model name "BlogPost"', function () {
    checkModelName(BlogPost)('BlogPost');
  });

  describe('should have properties', function () {
    const properties = ['id', 'title', 'content', 'userId', 'published', 'updated'];
    properties.forEach(checkPropertyExists(blogPost));
  });

  describe('should have associations', function () {
    const User = { belongsTo: sinon.spy() };
    
    before(function () {
      BlogPost.associate({ User });
    });

    const options = {
      foreignKey: 'userId',
      as: 'user',
    };

    it('defined a belongsTo association with BlogPost', function () {
      expect(BlogPost.belongsTo).to.have.been.calledWith(User, options);
    });
  });
});
