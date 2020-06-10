const { responseUser } = require('./user');

const socialSchema = {
  schema: {
    response: {
      200: responseUser,
    },
  },
};

module.exports = {
  socialSchema,
};
