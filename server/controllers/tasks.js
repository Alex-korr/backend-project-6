import Task from '../models/Task.js';
import TaskStatus from '../models/TaskStatus.js';
import User from '../models/User.js';

export const index = async (req, reply) => {
  try {
    const tasks = await Task.query().withGraphFetched('[status, creator, executor]');
    const error = req.session?.flash?.error || [];
    const success = req.session?.flash?.success || [];
    req.session.flash = {};
    const currentLang = req.query.lang || 'en';
    return reply.view('tasks/index', { tasks, currentUser: req.user, error, success, currentLang });
  } catch (err) {
    console.error('TASKS INDEX ERROR:', err);
    reply.type('text/html').code(500).send('<h1>Tasks Controller Error</h1><pre>' + err.stack + '</pre>');
  }
};

export const show = async (req, reply) => {
  const { id } = req.params;
  const task = await Task.query().findById(id).withGraphFetched('[status, creator, executor]');
  if (!task) return reply.code(404).send('Task not found');
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  reply.view('tasks/show', { task, currentUser: req.user, error, success });
};

export const newTask = async (req, reply) => {
  const statuses = await TaskStatus.query();
  const users = await User.query();
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  reply.view('tasks/new', { statuses, users, task: {}, currentUser: req.user, error, success });
};

export const create = async (req, reply) => {
    const { name, description, statusId, executorId } = req.body;
    const creatorId = req.user.id;
    try {
      await Task.query().insert({ name, description, statusId, creatorId, executorId });
      req.flash('success', req.t('flash.tasks.create.success'));
      reply.redirect('/tasks');
    } catch (e) {
      req.flash('error', req.t('flash.tasks.create.error'));
      reply.redirect('/tasks/new');
    }
};

export const edit = async (req, reply) => {
  const { id } = req.params;
  const task = await Task.query().findById(id);
  if (!task) return reply.code(404).send('Task not found');
  const statuses = await TaskStatus.query();
  const users = await User.query();
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  reply.view('tasks/edit', { task, statuses, users, currentUser: req.user, error, success });
};

export const update = async (req, reply) => {
    const { id } = req.params;
    const { name, description, statusId, executorId } = req.body;
    try {
      await Task.query().findById(id).patch({ name, description, statusId, executorId });
      req.flash('success', req.t('flash.tasks.update.success'));
      reply.redirect(`/tasks/${id}`);
    } catch (e) {
      req.flash('error', req.t('flash.tasks.update.error'));
      reply.redirect(`/tasks/${id}/edit`);
    }
};

export const remove = async (req, reply) => {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) return reply.code(404).send('Task not found');
    if (task.creatorId !== req.user.id) {
      req.flash('error', req.t('flash.tasks.delete.forbidden'));
      return reply.redirect('/tasks');
    }
    await Task.query().deleteById(id);
    req.flash('success', req.t('flash.tasks.delete.success'));
    reply.redirect('/tasks');
};
