const ACL = require('acl');
const jwt = require('jsonwebtoken');
const fp = require('fastify-plugin');
const httpError = require('http-errors');

const hookFactory = function (fastify, options) {
  return async function (request, reply) {
    let user = {
      id: 'user',
      role: 'user',
    };

    if (request.headers && request.headers.authorization) {
      const parts = request.headers.authorization.split(' ');
      if (parts.length === 2) {
        token = parts[1];
      }

      const decoded = jwt.decode(token);

      user = decoded.payload;
    }

    // create user
    const { id, role } = user;
    fastify.acl.addUserRoles(id, role);

    // check access
    const { resource, permissions } = options;
    return fastify.acl.isAllowed(id, resource, permissions, (err, allowed) => {
      if (err) {
        return reply
          .code(500)
          .send(
            httpError.InternalServerError(
              'Error checking permissions to access resource'
            )
          );
      } else if (allowed === false) {
        return reply
          .code(403)
          .send(
            httpError.Forbidden('Insufficient permissions to access resource')
          );
      }
    });
  };
};

const aclFactory = fp(async (fastify, opts, next) => {
  const hook = hookFactory(fastify, opts);
  fastify.addHook('preHandler', hook);
});

const acl = fp(async (fastify, opts, next) => {
  fastify.decorate('acl', new ACL(new ACL.memoryBackend()));
});

module.exports = {
  acl,
  aclFactory,
};
