const { aclFactory } = require('../../plugins/acl');
const fastify = require('../../fastify');
const adminAuth = require('./auth');
const users = require('./users');
const userSchema = require('../../schemas/user');

/* eslint-disable prettier/prettier */
fastify.post('/admin/login', userSchema.userSchema, adminAuth.login);

fastify.register(async (adminRouter) => {

  // The routes of users
  fastify.acl.allow(['admin'], 'users', '*');

  adminRouter.register(async (userRoute) => {
    userRoute.addHook('preValidation', fastify.authenticate);
    userRoute.register(aclFactory, { resource: 'users', permissions: 'create' });

    userRoute.get(    '/admin/users',              userSchema.list,      users.list    );
    userRoute.get(    '/admin/users/ids',          userSchema.many,      users.getMany );
    userRoute.get(    '/admin/users/:id(\\d+)',    userSchema.one,       users.get     );
    userRoute.post(   '/admin/users',              userSchema.create,    users.create  );
    userRoute.put(    '/admin/users/:id(\\d+)',    userSchema.update,    users.update  );
    userRoute.delete( '/admin/users/:id(\\d+)',    userSchema.remove,    users.remove  );
  });
});
/* eslint-enable prettier/prettier */
