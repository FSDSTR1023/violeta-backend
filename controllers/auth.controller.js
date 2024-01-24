const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  console.log('Token:', token)
  if (!token) {
    res.status(401).send({ error: "No token provided" });
    return;
  }

  try {
    const data = await jwt.verify(token, jwtSecretKey);
    if (!data) {
      res.status(500);
      return;
    }
    req.user = data;
    next();
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

module.exports = authMiddleware;
