const fastify = require('../fastify');
const { acl } = require('./acl');

fastify.register(require('fastify-cors'), {});

// Authentication
require('./auth');

fastify.register(acl);

// Uploads handling
const fileUpload = require('fastify-file-upload');
const path = require('path');

fastify.register(fileUpload);

// Static files handling
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'files'),
  prefix: '/public/',
});
