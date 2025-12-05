// @ts-check
const BaseModel = require('./BaseModel.cjs');
const TaskStatus = require('./TaskStatus.cjs');
const Label = require('./Label.cjs');
const User = require('./User.cjs');

module.exports = class Task extends BaseModel {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: ['string', 'null'] },
        statusId: { type: 'integer' },
        executorId: { type: ['integer', 'null'] },
        creatorId: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }
  static get relationMappings() {
    const TaskStatus = require('./TaskStatus.cjs');
    const Label = require('./Label.cjs');
    const User = require('./User.cjs');
    return {
      status: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: TaskStatus,
        join: {
          from: 'tasks.statusId',
          to: 'task_statuses.id',
        },
      },
      labels: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Label,
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
        modelClass: User,
        join: {
          from: 'tasks.executorId',
          to: 'users.id',
        },
      },
      creator: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.creatorId',
          to: 'users.id',
        },
      },
    };
  }
};
