const dotenv = require('dotenv').config();
const { DATABASE_URL } = process.env;

module.exports = {
  client: 'pg',
  debug: false,
  connection: DATABASE_URL,
  pool: {
    min: 1,
    max: 1,
  },
};
