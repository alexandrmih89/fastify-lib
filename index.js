const dotenv = require('dotenv').config();
const fastifyEnv = require('fastify-env');

// Initialize fastify
const fastify = require('./fastify');

// db plugins init should go first, so it injects models
require('./db');

// other plugins
require('./plugins');

// routes
require('./routes/admin');
require('./routes');

if (require.main === module) {
  // called directly i.e. "node app"
  fastify.listen(3000, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
}

module.exports = fastify;
