const { validateToken } = require('../auth/token.jwt');

const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const [, tokenValue] = token.split(' ');
    const decoded = validateToken(tokenValue);
    if (!decoded) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    req.user = decoded;
    
    next();
};

module.exports = {
  checkToken,
};