const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');
const { makeMockModels } = require('sequelize-test-helpers');
const {
  mockNewUser,
  mockToken,
  mockCreatedUserFromModel,
  mockFailedCreatedUserFromModel,
} = require('../../mocks/user.mocks');

const { expect } = chai;
chai.use(sinonChai);

describe('User services should work as intended', function () {
  describe('createUser', function () {
    const User = { findOne: sinon.stub(), create: sinon.stub() };
    const { createUser } = proxyquire('../../../src/services/users.services', {
      '../models': makeMockModels({ User }),
      '../auth/token.jwt': { generateToken: () => mockToken },
    });

    afterEach(function () {
      sinon.resetHistory();
    });

    it('should create a new user and return a token', async function () {
      User.findOne.resolves(null);
      User.create.resolves({ ...mockNewUser, id: 1 });
      const result = await createUser(mockNewUser);
      expect(result).to.deep.equal(mockCreatedUserFromModel);
    });

    it('should return a conflict error if the email is already registered', async function () {
      User.findOne.resolves(true);
      const result = await createUser(mockNewUser);
      expect(result).to.deep.equal(mockFailedCreatedUserFromModel);
    });
  });
});
