const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const ApiError = (message, code = 500) => {
  return createError(code, message);
};

const NotFound = (message) => {
  return createError.NotFound(message);
};

const getHash = (str) => {
  return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
};

const compareHash = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};

const userFromHeaders = (headers, jwt) => {
  const { authorization } = headers;
  if (!authorization) {
    throw createError.Unauthorized();
  }
  const token = authorization.replace('Bearer ', '');
  const decodedToken = jwt.decode(token);
  const user = decodedToken.payload.id;
  return user;
};

module.exports = {
  HTTPError: createError,
  ApiError,
  NotFound,
  getHash,
  compareHash,
  userFromHeaders,
};
