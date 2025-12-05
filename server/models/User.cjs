

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
      required: ['email', 'password_digest'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, format: 'email' },
        password_digest: { type: 'string', minLength: 60, maxLength: 60 },
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
    // If raw password is provided, hash it and store as password_digest
    if (this.password && !this.password_digest) {
      console.log('Hashing raw password...');
      const { hashPassword } = require('../lib/secure.cjs');
      this.password_digest = await hashPassword(this.password);
      delete this.password; // Remove plain text password
      console.log('Password hashed, digest length:', this.password_digest?.length);
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
      this.password_digest = await hashPassword(this.password);
      delete this.password; // Remove plain text password
      this.updated_at = new Date().toISOString();
    }
  }

  // Method to set password (can be called externally)
  async setPassword(password) {
    console.log('=== setPassword called ===');
    console.log('For user:', this.email);
    const { hashPassword } = require('../lib/secure.cjs');
    this.password_digest = await hashPassword(password);
  }

  // Method to verify password against stored hash
  async verifyPassword(password) {
    console.log('=== verifyPassword called ===');
    console.log('User ID:', this.id);
    console.log('User email:', this.email);
    console.log('Input password length:', password?.length);
    console.log('Stored passwordDigest exists:', !!this.passwordDigest);
    console.log('passwordDigest length:', this.passwordDigest?.length);
    if (!this.passwordDigest) {
      console.error('CRITICAL ERROR: User has no passwordDigest!');
      console.log('User object keys:', Object.keys(this));
      return false;
    }
    try {
      const { comparePassword } = require('../lib/secure.cjs');
      const result = await comparePassword(password, this.passwordDigest);
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
      hasPasswordDigest: !!this.passwordDigest,
      passwordDigestLength: this.passwordDigest?.length,
      passwordDigestPreview: this.passwordDigest?.substring(0, 20) + '...'
    };
  }
};