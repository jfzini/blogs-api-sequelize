const { generateToken, validateToken } = require('../auth/token.jwt');
const { LoginService } = require('../services');

const validateLogin = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await LoginService.findUser(email);
  if (!foundUser || foundUser.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const token = generateToken(foundUser.dataValues);

  const valid = validateToken(token);
  console.log(valid);
  return res.status(200).json({ token });
};

module.exports = {
  validateLogin,
};
