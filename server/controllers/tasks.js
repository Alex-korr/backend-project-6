import Task from '../models/Task.js';
import TaskStatus from '../models/TaskStatus.js';
import User from '../models/User.js';

export const index = async (req, reply) => {
  try {
    let queryBuilder = Task.query().withGraphFetched('[status, labels, executor]');
    const { status, executor, label, my } = req.query;
    if (status) {
      queryBuilder = queryBuilder.where('statusId', status);
    }
    if (executor) {
      queryBuilder = queryBuilder.where('executorId', executor);
    }
    if (label) {
      queryBuilder = queryBuilder.whereExists(
        Task.relatedQuery('labels').where('labels.id', label)
      );
    }
    // creator filter removed
    const tasks = await queryBuilder;
    const statuses = await TaskStatus.query();
    const users = await User.query();
    const labels = await import('../models/Label.js').then(m => m.default.query());
    const error = req.session?.flash?.error || [];
    const success = req.session?.flash?.success || [];
    req.session.flash = {};
    const currentLang = req.cookies?.lang || req.query.lang || 'en';
    return reply.view('tasks/index', {
      tasks,
      statuses,
      users,
      labels,
      query: req.query,
      currentUser: req.user,
      error,
      success,
      currentLang,
      t: req.i18next.t.bind(req.i18next),
      isAuthenticated: !!req.user,
      user: req.user,
    });
  } catch (err) {
    console.error('TASKS INDEX ERROR:', err);
    reply.type('text/html').code(500).send('<h1>Tasks Controller Error</h1><pre>' + err.stack + '</pre>');
  }
};

export const show = async (req, reply) => {
  const { id } = req.params;
  const task = await Task.query().findById(id).withGraphFetched('[status, labels]');
  if (!task) return reply.code(404).send('Task not found');
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  reply.view('tasks/show', {
    task,
    currentUser: req.user,
    error,
    success,
    currentLang: req.cookies?.lang || req.query.lang || 'en',
    t: req.i18next.t.bind(req.i18next),
    isAuthenticated: !!req.user,
    user: req.user,
  });
};

export const newTask = async (req, reply) => {
  const statuses = await TaskStatus.query();
  const users = await User.query();
  const labels = await import('../models/Label.js').then(m => m.default.query());
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  return reply.view('tasks/new', {
    statuses,
    users,
    labels,
    task: {},
    currentUser: req.user,
    error,
    success,
    currentLang: req.cookies?.lang || req.query.lang || 'en',
    t: req.i18next.t.bind(req.i18next),
    isAuthenticated: !!req.user,
    user: req.user,
  });
};

export const create = async (req, reply) => {
    const { name, description, statusId, executorId, labels } = req.body;
    const creatorId = req.user?.id;
    try {
      if (!creatorId) {
        console.error('No creatorId, user not authenticated');
        req.flash('error', 'User not authenticated');
        return reply.redirect('/session/new');
      }
      // Convert statusId and executorId to integers (or null)
      const statusIdInt = statusId ? Number(statusId) : null;
      const executorIdInt = executorId ? Number(executorId) : null;
      const task = await Task.query().insert({ name, description, statusId: statusIdInt, creatorId, executorId: executorIdInt });
      if (labels) {
        const labelIds = Array.isArray(labels) ? labels : [labels];
        await task.$relatedQuery('labels').relate(labelIds);
      }
      // Success flash message removed as requested
      reply.redirect('/tasks');
    } catch (e) {
      console.error('Error in create task controller:', e);
      req.flash('error', req.i18next.t('flash.tasks.create.error'));
      reply.redirect('/tasks/new');
    }
};

export const edit = async (req, reply) => {
  const { id } = req.params;
  const task = await Task.query().findById(id).withGraphFetched('labels');
  if (!task) return reply.code(404).send('Task not found');
  const statuses = await TaskStatus.query();
  const users = await User.query();
  const labels = await import('../models/Label.js').then(m => m.default.query());
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  reply.view('tasks/edit', {
    task,
    statuses,
    users,
    labels,
    currentUser: req.user,
    error,
    success,
    currentLang: req.cookies?.lang || req.query.lang || 'en',
    t: req.i18next.t.bind(req.i18next),
    isAuthenticated: !!req.user,
    user: req.user,
  });
};

export const update = async (req, reply) => {
    const { id } = req.params;
    const { name, description, statusId, executorId, labels } = req.body;
    try {
      await Task.query().findById(id).patch({ name, description, statusId, executorId });
      const task = await Task.query().findById(id);
      // Сначала отвязываем все старые метки
      await task.$relatedQuery('labels').unrelate();
      // Потом привязываем новые
      if (labels) {
        const labelIds = Array.isArray(labels) ? labels : [labels];
        await task.$relatedQuery('labels').relate(labelIds);
      }
      req.flash('success', req.i18next.t('flash.tasks.update.success'));
      reply.redirect(`/tasks/${id}`);
    } catch (e) {
      req.flash('error', req.i18next.t('flash.tasks.update.error'));
      reply.redirect(`/tasks/${id}/edit`);
    }
};

export const remove = async (req, reply) => {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) return reply.code(404).send('Task not found');
    if (task.creatorId !== req.user.id) {
      req.flash('error', req.i18next.t('flash.tasks.delete.forbidden'));
      return reply.redirect('/tasks');
    }
    await Task.query().deleteById(id);
    req.flash('success', req.i18next.t('flash.tasks.delete.success'));
    reply.redirect('/tasks');
};
