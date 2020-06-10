const { Model } = require('objection');

class ExtendedModel extends Model {
  static get useSnakeCase() {
    return false;
  }
  static create(data) {
    return this.query().insert(data);
  }

  static list({ page = 0, limit = 10000 } = {}) {
    return this.query().page(0, limit);
  }

  static findById(id) {
    return this.query().findById(id);
  }

  static update(id, data) {
    return this.query().updateAndFetchById(id, data);
  }

  static delete(id) {
    return this.query().deleteById(id);
  }
}

module.exports = ExtendedModel;
