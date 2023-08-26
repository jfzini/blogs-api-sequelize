const { generateToken } = require('../auth/token.jwt');
const { User } = require('../models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }
  delete user.dataValues.password;
  const token = generateToken(user.dataValues);
  return { status: 'SUCESSFUL', data: { token } };
};

module.exports = {
  login,
};
