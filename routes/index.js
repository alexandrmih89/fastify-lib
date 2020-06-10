const fastify = require('../fastify');
const auth = require('./auth');
const authSchema = require('../schemas/auth');
const userSchema = require('../schemas/user');

/* eslint-disable prettier/prettier */
fastify.get(  '/login/facebook/callback',    authSchema.socialSchema,    auth.loginFacebook );
fastify.get(  '/login/google/callback',      authSchema.socialSchema,    auth.loginGoogle   );
fastify.post( '/register',                   userSchema.userSchema,      auth.registerUser  );
fastify.post( '/login',                      userSchema.userSchema,      auth.login         );
/* eslint-enable prettier/prettier */
