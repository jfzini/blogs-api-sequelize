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

module.exports = {
  createUser,
};
