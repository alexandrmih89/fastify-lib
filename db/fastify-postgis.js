'use strict';

const fp = require('fastify-plugin');
const knexPostgis = require('knex-postgis');

function fastifyPostgis(fastify, options, next) {
  if (!fastify.objection) {
    next(new Error('fastify-objection has not registered'));
    return;
  }

  if (!fastify.st) {
    const st = knexPostgis(fastify.objection.knex);
    fastify.decorate('st', st);
  } else {
    next(new Error('knex-postgis has already registered.'));
    return;
  }

  next();
}

module.exports = fp(fastifyPostgis, {
  fastify: '>=2.0.0',
  'fastify-objectionjs': '>=0.2.0',
  name: 'fastify-postgis',
});
