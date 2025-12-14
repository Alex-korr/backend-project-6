

const BaseModel = require('./BaseModel.cjs');
const encrypt = require('../lib/secure.cjs');
const { snakeCaseMappers } = require('objection');

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

  // Hook that runs before inserting a new user
  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    // If password is not a bcrypt hash, hash it
    if (this.password && !this.password.startsWith('$2b$')) {
      const { hashPassword } = require('../lib/secure.cjs');
      this.password = await hashPassword(this.password);
    }
    // Set timestamps
    const now = new Date().toISOString();
    this.created_at = now;
    this.updated_at = now;
  }

  // Hook that runs before updating a user
  async $beforeUpdate(opt, context) {
    await super.$beforeUpdate(opt, context);
    // If password is being updated
    if (this.password) {
      const { hashPassword } = require('../lib/secure.cjs');
      this.password = await hashPassword(this.password);
        // delete this.password; // Remove plain text password
      this.updated_at = new Date().toISOString();
    }
  }

  // Method to set password (can be called externally)
  async setPassword(password) {
    const { hashPassword } = require('../lib/secure.cjs');
    this.password = await hashPassword(password);
  }

  // Method to verify password against stored hash
  async verifyPassword(password) {
    if (!this.password) {
      return false;
    }
    try {
      const { comparePassword } = require('../lib/secure.cjs');
      const result = await comparePassword(password, this.password);
      return result;
    } catch (error) {
      return false;
    }
  }
  
  // Debug getter
};