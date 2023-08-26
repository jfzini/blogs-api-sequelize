const { User } = require('../models');

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = {
  findUser,
};
