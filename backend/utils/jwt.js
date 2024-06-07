const jwt = require("jsonwebtoken");

const createJWT = (playload) => {
  const token = jwt.sign(playload, process.env.JWT_LOGIN_TOKEN, {
    expiresIn: "1d",
  });
  return token;
};


const isTokenValid = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
  return decoded;
};

module.exports = { createJWT, isTokenValid };
