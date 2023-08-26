const { UserService } = require('../services');
const statusHTTP = require('./utils/statusHTTP');

const createUser = async (req, res) => {
  const result = await UserService.createUser(req.body);
  res.status(statusHTTP[result.status]).json(result.data);
};

module.exports = {
  createUser,
};
