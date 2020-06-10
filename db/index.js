const pg = require('pg');
const m = require('moment');
const fastify = require('../fastify');

const knexConfig = require('../knexfile');

const setTypeParser = () => {
  const DATE_OID = 1082;
  const TIMESTAMP_OID = 1114;

  pg.types.setTypeParser(DATE_OID, function (val) {
    // For a DATE field, I only want the date
    return val === null ? null : m.utc(val).format('YYYY-MM-DD');
  });

  pg.types.setTypeParser(TIMESTAMP_OID, function (val) {
    // Ensure no timezone
    return val === null ? null : m.utc(val).toDate();
  });
};

setTypeParser();

const User = require('./models/user');

fastify.register(require('fastify-objectionjs'), {
  knexConfig,
  models: [User],
});
