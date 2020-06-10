const { ApiError, getHash, compareHash } = require('../../../util');
const fastify = require('../../../fastify');

let JWT;
fastify.register(async () => {
  JWT = fastify.jwt;
});

const User = require('../../../db/models/user');

const BAD_LOGIN = 'Wrong login or password';

const auth = {
  login: async function (req, reply) {
    const { login, password = '' } = req.body;

    const user = await User.query().findOne({
      username: login,
      role: 'admin',
    });

    if (!user) {
      throw ApiError(BAD_LOGIN, 400);
    }

    if (!(user && compareHash(password, user.password))) {
      throw ApiError(BAD_LOGIN, 400);
    }

    const token = JWT.sign({ payload: user });
    reply.send({ token });
  },
};

module.exports = auth;
