const jwt = require("jsonwebtoken");
const { env } = require("../config");

const signCookie = async (res, user, defaultOptions = {}) => {
  const token = await jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES,
  });

  const options = {
    httpOnly: false,
    ...defaultOptions,
  };

  res.cookie("token", token, options);
  return token;
};

module.exports = signCookie;
