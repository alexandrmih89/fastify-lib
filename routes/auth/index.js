const axios = require('axios');
const { get } = require('lodash');
const { ApiError, getHash, compareHash } = require('../../util');
const fastify = require('../../fastify');

let JWT;
fastify.register(async () => {
  JWT = fastify.jwt;
});

const User = require('../../db/models/user');

const BAD_LOGIN = 'Wrong login or password';

const auth = {
  registerUser: async function (req, reply) {
    const { login, password } = req.body;
    const user = await User.query().findOne({ username: login });

    if (user) {
      throw ApiError('User already exists', 403);
    }

    const hash = getHash(password);

    const res = await User.query().insert({
      username: login,
      password: hash,
    });

    const token = JWT.sign({ payload: res });
    reply.send({ token });
  },

  login: async function (req, reply) {
    const { login, password = '' } = req.body;

    const user = await User.query().findOne({
      username: login,
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

  getUserProfile: async function (req, res) {
    const id = get(req, 'user.payload.id');
    return res.send(await User.withCompanies(id));
  },

  updateUser: async function (req, reply) {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    const decodedToken = JWT.decode(token);
    const id = decodedToken.payload.id;

    const { password } = req.body;

    const newUser = req.body;

    if (password) {
      newUser.password = getHash(password);
    }

    await User.query().update(req.body).where('id', id);

    const res = await User.query().findById(id);

    reply.send(res);
  },

  loginFacebook: async function (req, reply) {
    const FcToken = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)
    const res = await axios({url: `https://graph.facebook.com/me?fields=id,name&access_token=${FcToken.access_token}`});

    let user = await User.query().findOne({ username: res.data.id });

    if (!user) {
      user = await User.query().insert({
        username: res.data.id,
        name: res.data.name,
      });
    }

    const token = JWT.sign({ payload: user });
    reply.send({ token });
  },

  loginGoogle: async function (req, reply) {
    const result = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)
    const res = await axios({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: {
        Authorization: 'Bearer ' + result.access_token,
      },
    });

    let user = await User.query().findOne({ username: res.data.sub });

    if (!user) {
      user = await User.query().insert({
        username: res.data.sub,
        name: res.data.name,
      });
    }

    const token = JWT.sign({ payload: user });
    reply.send({ token });
  },
};

module.exports = auth;
