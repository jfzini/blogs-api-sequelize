const { UserService } = require('../services');
const statusHTTP = require('./utils/statusHTTP');

const createUser = async (req, res) => {
  const result = await UserService.createUser(req.body);
  return res.status(statusHTTP[result.status]).json(result.data);
};

const findAllUsers = async (req, res) => {
  const result = await UserService.findAllUsers();
  return res.status(statusHTTP[result.status]).json(result.data);
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const result = await UserService.findUserById(id);
  return res.status(statusHTTP[result.status]).json(result.data);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(statusHTTP.BAD_REQUEST).json({ message: 'Login invalid, try relogging' });
  }
  const result = await UserService.deleteUser(id);
  return res.status(statusHTTP[result.status]).end();
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  deleteUser,
};
