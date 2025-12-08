

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
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  // Hook that runs before inserting a new user
  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    console.log('=== $beforeInsert hook ===');
    console.log('User email:', this.email);
    // If password is not a bcrypt hash, hash it
    if (this.password && !this.password.startsWith('$2b$')) {
      console.log('Hashing raw password...');
      const { hashPassword } = require('../lib/secure.cjs');
      this.password = await hashPassword(this.password);
      console.log('Password hashed, length:', this.password?.length);
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
      console.log('=== $beforeUpdate: Hashing new password ===');
      const { hashPassword } = require('../lib/secure.cjs');
      this.password = await hashPassword(this.password);
        // delete this.password; // Remove plain text password
      this.updated_at = new Date().toISOString();
    }
  }

  // Method to set password (can be called externally)
  async setPassword(password) {
    console.log('=== setPassword called ===');
    console.log('For user:', this.email);
    const { hashPassword } = require('../lib/secure.cjs');
    this.password = await hashPassword(password);
  }

  // Method to verify password against stored hash
  async verifyPassword(password) {
    console.log('=== verifyPassword called ===');
    console.log('User ID:', this.id);
    console.log('User email:', this.email);
    console.log('Input password length:', password?.length);
    console.log('Stored password exists:', !!this.password);
    console.log('password length:', this.password?.length);
    if (!this.password) {
      console.error('CRITICAL ERROR: User has no password!');
      console.log('User object keys:', Object.keys(this));
      return false;
    }
    try {
      const { comparePassword } = require('../lib/secure.cjs');
      const result = await comparePassword(password, this.password);
      console.log('verifyPassword result:', result);
      return result;
    } catch (error) {
      console.error('ERROR in verifyPassword:', error);
      return false;
    }
  }
  
  // Debug getter
  get debugInfo() {
    return {
      id: this.id,
      email: this.email,
      hasPassword: !!this.password,
      passwordLength: this.password?.length,
      passwordPreview: this.password?.substring(0, 20) + '...'
    };
  }
};