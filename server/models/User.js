import { Model } from 'objection';
import bcrypt from 'bcrypt';
import yup from 'yup';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    // Add relations if needed
    return {};
  }

  async $beforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default User;