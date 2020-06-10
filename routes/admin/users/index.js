const fastify = require('../../../fastify');
const { NotFound, ApiError, userFromHeaders, getHash } = require('../../../util');
const User = require('../../../db/models/user');

let JWT;
fastify.register(async () => {
  JWT = fastify.jwt;
});

async function create(req, reply) {
  const {password} = req.body;
  const result = await User.create({
    ...req.body,
    password: getHash(password),
  });
  reply.send(result);
}

async function list(req, reply) {
  const result = await User.list(req.query);
  reply.send(result);
}

async function get(req, reply) {
  const id = parseInt(req.params.id);
  const user = await User.findById(id);
  reply.send(user);
}

async function update(req, reply) {
  const id = parseInt(req.params.id);
  const data = req.body;
  const newData = data;
  if (data && data.password) {
    newData.password = getHash(data.password)
  }
  const user = await User.update(id, newData);
  reply.send(user);
}

async function remove(req, reply) {
  const result = await User.delete(parseInt(req.params.id));
  reply.send(result);
}

async function getMany(req, reply) {
  const { id } = req.query;

  const result = await User.query().findByIds(id);
  reply.send(result);
}

module.exports = {
  create,
  list,
  get,
  update,
  remove,
  getMany
};
