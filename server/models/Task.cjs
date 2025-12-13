// @ts-check

const BaseModel = require('./BaseModel.cjs');
const TaskStatus = require('./TaskStatus.cjs');
const Label = require('./Label.cjs');
const User = require('./User.cjs');
const { snakeCaseMappers } = require('objection');

module.exports = class Task extends BaseModel {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'status_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: ['string', 'null'] },
        status_id: { type: 'integer' },
        executor_id: { type: ['integer', 'null'] },
        creator_id: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }
  static get relationMappings() {
    return {
      status: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: __dirname + '/TaskStatus.cjs',
        join: {
          from: 'tasks.status_id',
          to: 'task_statuses.id',
        },
      },
      labels: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: __dirname + '/Label.cjs',
        join: {
          from: 'tasks.id',
          through: {
            from: 'task_labels.task_id',
            to: 'task_labels.label_id',
          },
          to: 'labels.id',
        },
      },
      executor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: __dirname + '/User.cjs',
        join: {
          from: 'tasks.executor_id',
          to: 'users.id',
        },
      },
      creator: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: __dirname + '/User.cjs',
        join: {
          from: 'tasks.creator_id',
          to: 'users.id',
        },
      },
    };
  }
};
