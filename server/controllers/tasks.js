import Task from '../models/Task.cjs';
import TaskStatus from '../models/TaskStatus.cjs';
import User from '../models/User.cjs';

export const index = async (req, reply) => {
  try {
    const query = req.query || {};
    let queryBuilder = Task.query().withGraphFetched('[status, labels, executor, creator]');
    const { status, executor, label, my } = query;
    if (status) {
      queryBuilder = queryBuilder.where('status_id', status);
    }
    if (executor) {
      queryBuilder = queryBuilder.where('executor_id', executor);
    }
    if (label) {
      queryBuilder = queryBuilder.whereExists(
        Task.relatedQuery('labels').where('labels.id', label)
      );
    }
    let tasks;
    if (my && !req.user) {
      tasks = [];
    } else if (my && req.user) {
      tasks = await queryBuilder.where('creator_id', req.user.id);
    } else {
      tasks = await queryBuilder;
    }
    if (tasks && tasks.length) {
      // Debug: show all tasks with relations
      // eslint-disable-next-line no-console
      console.log('DEBUG all tasks:', JSON.stringify(tasks, null, 2));
      // Do not convert to plain objects, pass as is to preserve relations
    }
    const statuses = await TaskStatus.query();
    const users = await User.query();
    const labels = await import('../models/Label.cjs').then(m => m.default.query());
    const error = req.session?.flash?.error || [];
    const success = req.session?.flash?.success || [];
    req.session.flash = {};
    const currentLang = req.cookies?.lang || query.lang || 'en';
    // Fallback for i18next in tests
    const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s => s);
    return reply.view('tasks/index', {
      tasks,
      statuses,
      users,
      labels,
      query,
      currentUser: req.user,
      error,
      success,
      currentLang,
      t,
      isAuthenticated: !!req.user,
      user: req.user,
      currentUrl: req.raw.url,
    });
  } catch (err) {
    console.error('TASKS INDEX ERROR:', err);
    reply.type('text/html').code(500).send('<h1>Tasks Controller Error</h1><pre>' + err.stack + '</pre>');
  }
};

export const show = async (req, reply) => {
  const query = req.query || {};
  const { id } = req.params;
  const task = await Task.query().findById(id).withGraphFetched('[status, labels, executor, creator]');
  if (!task) return reply.code(404).send('Task not found');
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s => s);
  return reply.view('tasks/show', {
    task,
    currentUser: req.user,
    error,
    success,
    currentLang: req.cookies?.lang || query.lang || 'en',
    t,
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query,
  });
};

export const newTask = async (req, reply) => {
  const query = req.query || {};
  const statuses = await TaskStatus.query();
  const users = await User.query();
  const labels = await import('../models/Label.cjs').then(m => m.default.query());
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s => s);
  return reply.view('tasks/new', {
    statuses,
    users,
    labels,
    task: {},
    currentUser: req.user,
    error,
    success,
    currentLang: req.cookies?.lang || query.lang || 'en',
    t,
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query,
  });
};

export const create = async (req, reply) => {
    const { name, description, status_id, executorId, newLabels } = req.body;
    const raw = req.body['labels[]'];
    let labelIds = raw ? (Array.isArray(raw) ? raw : [raw]) : [];
    const creator_id = req.user?.id;
    const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s => s);
    try {
      if (!creator_id) {
        console.error('No creator_id, user not authenticated');
        req.flash('error', t('User not authenticated'));
        return reply.redirect('/session/new');
      }
      // Convert statusId and executorId to integers (or null)
      const status_id_int = status_id ? Number(status_id) : null;
      const executor_id = executorId ? Number(executorId) : null;
      // Create new labels if provided
      if (newLabels && newLabels.trim()) {
        const Label = (await import('../models/Label.js')).default;
        const names = newLabels.split(',').map(s => s.trim()).filter(Boolean);
        for (const name of names) {
          // Check if label already exists
          let label = await Label.query().findOne({ name });
          if (!label) {
            label = await Label.query().insert({ name });
          }
          labelIds.push(label.id.toString());
        }
      }
      const task = await Task.query().insert({ name, description, status_id: status_id_int, creator_id, executor_id });
      if (labelIds.length > 0) {
        for (const labelId of labelIds) {
          await task.$relatedQuery('labels').relate(Number(labelId));
        }
      }
      // Fetch the task with creator relation to ensure it's available in the next render
      await Task.query().findById(task.id).withGraphFetched('[creator]');
      req.session.flash = { success: ['Задача успешно создана'] };
      reply.redirect('/tasks');
    } catch (e) {
      console.error('Error in create task controller:', e);
      // Show error message on the page for diagnostics
      return reply.view('tasks/new', {
        statuses: await TaskStatus.query(),
        users: await User.query(),
        labels: await import('../models/Label.cjs').then(m => m.default.query()),
        task: { name, description, status_id, executor_id, labels: labelIds },
        currentUser: req.user,
        error: [t('flash.tasks.create.error'), e.message],
        success: [],
        currentLang: req.cookies?.lang || req.query.lang || 'en',
        t,
        isAuthenticated: !!req.user,
        user: req.user,
        currentUrl: req.raw.url,
        query: req.query || {},
      });
    }
};

export const edit = async (req, reply) => {
  const query = req.query || {};
  const { id } = req.params;
  const task = await Task.query().findById(id).withGraphFetched('labels');
  if (!task) return reply.code(404).send('Task not found');
  const statuses = await TaskStatus.query();
  const users = await User.query();
  const labels = await import('../models/Label.cjs').then(m => m.default.query());
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s => s);
  reply.view('tasks/edit', {
    task,
    statuses,
    users,
    labels,
    currentUser: req.user,
    error,
    success,
    currentLang: req.cookies?.lang || query.lang || 'en',
    t,
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query,
  });
};

export const update = async (req, reply) => {
    const { id } = req.params;
    const { name, description, statusId, executorId } = req.body;
    const raw = req.body['labels[]'];
    const labelIds = raw ? (Array.isArray(raw) ? raw : [raw]) : [];
    try {
      await Task.query().findById(id).patch({ name, description, statusId, executorId });
      const task = await Task.query().findById(id);
      // First, detach all old labels
      await task.$relatedQuery('labels').unrelate();
      // Then attach new ones
      for (const labelId of labelIds) {
        await task.$relatedQuery('labels').relate(Number(labelId));
      }
      const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s => s);
      req.flash('success', t('flash.tasks.update.success'));
      reply.redirect(`/tasks/${id}`);
    } catch (e) {
      req.flash('error', t('flash.tasks.update.error'));
      reply.redirect(`/tasks/${id}/edit`);
    }
};

export const remove = async (req, reply) => {
    const { id } = req.params;
    const task = await Task.query().findById(id);
    if (!task) return reply.code(404).send('Task not found');
    const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s => s);
    if (task.creator_id !== req.user.id) {
      req.flash('error', t('Task not found'));
      return reply.redirect('/tasks');
    }
    await Task.query().deleteById(id);
    req.flash('success', t('Task was removed'));
    reply.redirect('/tasks');
};
