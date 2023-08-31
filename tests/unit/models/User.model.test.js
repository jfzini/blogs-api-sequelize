const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const UserModel = require('../../../src/models/User');

chai.use(sinonChai);
const { expect } = chai;

describe('User model should work as expected', function () {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('should have model name "User"', function () {
    checkModelName(User)('User');
  });

  describe('should have properties', function () {
    const properties = ['id', 'displayName', 'email', 'password', 'image'];
    properties.forEach(checkPropertyExists(user));
  });

  describe('should have associations', function () {
    const BlogPost = { hasMany: sinon.spy() };

    before(function () {
      User.associate({ BlogPost });
    });

    it('defined a hasMany association with BlogPost', function () {
      expect(User.hasMany).to.have.been.calledWith(BlogPost);
    });
  });
});
