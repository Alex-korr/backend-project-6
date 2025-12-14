const BaseModel = require('./BaseModel.cjs');
const { snakeCaseMappers } = require('objection');
const encrypt = require('../lib/secure.cjs');

module.exports = class User extends BaseModel {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, format: 'email' },
        password: { type: 'string', minLength: 3 },
        first_name: { type: 'string', minLength: 1 },
        last_name: { type: 'string', minLength: 1 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await encrypt.hashPassword(this.password);
    }
    const now = new Date().toISOString();
    this.created_at = now;
    this.updated_at = now;
  }

  async $beforeUpdate(opt, context) {
    await super.$beforeUpdate(opt, context);
    if (this.password) {
      this.password = await encrypt.hashPassword(this.password);
      this.updated_at = new Date().toISOString();
    }
  }

  async setPassword(password) {
    this.password = await encrypt.hashPassword(password);
  }

  async verifyPassword(password) {
    if (!this.password) {
      return false;
    }
    try {
      const result = await encrypt.comparePassword(password, this.password);
      return result;
    } catch (error) {
      return false;
    }
  }
}