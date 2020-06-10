const Model = require('../model');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'integer' },
        name: { type: ['string', 'null'] },
        email: { type: ['string', 'null'] },
        username: { type: ['string', 'null'] },
        password: { type: ['string', 'null'] },
        deleted: { type: 'boolean' },
      },
    };
  }
}

module.exports = User;
