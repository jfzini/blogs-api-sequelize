const { LoginService } = require('../services');
const statusHTTP = require('./utils/statusHTTP');

const validateLogin = async (req, res) => {
  const { email, password } = req.body;
  const login = await LoginService.login(email, password);
  return res.status(statusHTTP[login.status]).json(login.data);
  };

module.exports = {
  validateLogin,
};
