const { generateToken } = require('../auth/token.jwt');
const { User } = require('../models');

const createUser = async (user) => {
  const foundEmail = await User.findOne({ where: { email: user.email } });
  if (foundEmail) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  await User.create(user);

  // delete user.password; CHANGING DELETE DO CREATING A NEW OBJECT DUE TO LINTER
  const { password, ...newUser } = user;

  const token = generateToken(newUser);
  return { status: 'CREATED', data: { token } };
};

const findAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'SUCESSFUL', data: users };
};

const findUserById = async (id) => {
  const foundUser = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!foundUser) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }
  return { status: 'SUCESSFUL', data: foundUser };
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
};
