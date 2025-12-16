import Task from '../../models/Task.cjs';
import TaskStatus from '../../models/TaskStatus.cjs';
import User from '../../models/User.cjs';

export const index = async (req, reply) => {
  try {
    const query = req.query || {};
    const {
      status, executor, label, my,
    } = query;
    const isMy = my === 'on' || my === 'true' || my === true || my === 1 || my === '1';
    if (isMy && !req.user) {
      const statuses = await TaskStatus.query();
      const users = await User.query();
      const labels = await import('../../models/Label.cjs').then((m) => m.default.query());
      const error = req.session?.flash?.error || [];
      const success = req.session?.flash?.success || [];
      req.session.flash = {};
      const currentLang = req.cookies?.lang || query.lang || 'en';
      const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : ((s) => s);
      return reply.view(
        'tasks/index',
        {
          tasks: [],
          statuses,
          users,
          labels,
          query,
          currentUser: req.user || null,
          error,
          success,
          currentLang,
          t,
          isAuthenticated: !!req.user,
          user: req.user,
          currentUrl: req.raw.url,
        },
      );
    }

    let queryBuilder = Task.query().withGraphFetched('[status, labels, executor, creator]');
    if (status) {
      queryBuilder = queryBuilder.where('statusId', status);
    }
    if (executor) {
      queryBuilder = queryBuilder.where('executorId', executor);
    }
    if (isMy && req.user) {
      queryBuilder = queryBuilder.where('creatorId', req.user.id);
    }

    let labelIds = [];
    if (label) {
      if (Array.isArray(label)) {
        labelIds = label.filter(Boolean);
      } else {
        labelIds = [label];
      }
    }

    if (labelIds.length > 0) {
      queryBuilder = queryBuilder
        .joinRelated('labels')
        .whereIn('labels.id', labelIds);
    }

    const tasks = await queryBuilder;

    const statuses = await TaskStatus.query();
    const users = await User.query();
    const labels = await import('../../models/Label.cjs').then((m) => m.default.query());
    const error = req.session?.flash?.error || [];
    const success = req.session?.flash?.success || [];
    req.session.flash = {};
    const currentLang = req.cookies?.lang || query.lang || 'en';
    const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : ((s) => s);
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
    return reply.type('text/html').code(500).send(`<h1>Tasks Controller Error</h1><pre>${err.stack}</pre>`);
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
  const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : ((s) => s);
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
  const labels = await import('../../models/Label.cjs').then((m) => m.default.query());
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : ((s) => s);
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
  const {
    name, description, statusId, executorId, newLabels,
  } = req.body;
  const raw = req.body['labels[]'];
  let labelIds = [];
  if (raw) {
    labelIds = Array.isArray(raw) ? raw : [raw];
  }
  const creatorId = req.user?.id;
  const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : ((s) => s);
  try {
    if (!creatorId) {
      req.flash('error', t('User not authenticated'));
      return reply.redirect('/session/new');
    }
    // Convert statusId and executorId to integers (or null)
    const statusIdInt = statusId ? Number(statusId) : null;
    const executorIdInt = executorId ? Number(executorId) : null;
    // Create new labels if provided
    if (newLabels && newLabels.trim()) {
      const Label = (await import('../../models/Label.cjs')).default;
      const names = newLabels.split(',').map((s) => s.trim()).filter(Boolean);
      const labelResults = await Promise.all(
        names.map(async (labelName) => {
          let label = await Label.query().findOne({ name: labelName });
          if (!label) {
            label = await Label.query().insert({ name: labelName });
          }
          return label.id.toString();
        }),
      );
      labelIds.push(...labelResults);
    }
    const task = await Task.query().insert({
      name, description, statusId: statusIdInt, creatorId, executorId: executorIdInt,
    });
    if (labelIds.length > 0) {
      await Promise.all(
        labelIds.map((labelId) => task.$relatedQuery('labels').relate(Number(labelId))),
      );
    }
    // Fetch the task with creator relation to ensure it's available in the next render
    await Task.query().findById(task.id).withGraphFetched('[creator]');
    req.session.flash = { success: ['Задача успешно создана'] };
    return reply.redirect('/tasks');
  } catch (e) {
    // Show error message on the page for diagnostics
    return reply.view('tasks/new', {
      statuses: await TaskStatus.query(),
      users: await User.query(),
      labels: await import('../../models/Label.cjs').then((m) => m.default.query()),
      task: {
        name, description, statusId, executorId, labels: labelIds,
      },
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
  const labels = await import('../../models/Label.cjs').then((m) => m.default.query());
  const error = req.session?.flash?.error || [];
  const success = req.session?.flash?.success || [];
  req.session.flash = {};
  const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : ((s) => s);
  return reply.view(
    'tasks/edit',
    {
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
    },
  );
};

export const update = async (req, reply) => {
  const { id } = req.params;
  const {
    name, description, statusId, executorId,
  } = req.body;
  const raw = req.body['labels[]'];
  let labelIds = [];
  if (raw) {
    labelIds = Array.isArray(raw) ? raw : [raw];
  }
  try {
    await Task.query().findById(id).patch({
      name, description, statusId, executorId,
    });
    const task = await Task.query().findById(id);
    // First, detach all old labels
    await task.$relatedQuery('labels').unrelate();
    // Then attach new ones
    await Promise.all(
      labelIds.map((labelId) => task.$relatedQuery('labels').relate(Number(labelId))),
    );
    const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s) => s;
    req.flash('success', t('flash.tasks.update.success'));
    return reply.redirect(`/tasks/${id}`);
  } catch (e) {
    const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : (s) => s;
    req.flash('error', t('flash.tasks.update.error'));
    return reply.redirect(`/tasks/${id}/edit`);
  }
};

export const remove = async (req, reply) => {
  const { id } = req.params;
  const task = await Task.query().findById(id);
  if (!task) return reply.code(404).send('Task not found');
  const t = req.i18next?.t ? req.i18next.t.bind(req.i18next) : ((s) => s);
  if (Number(task.creatorId) !== Number(req.user.id)) {
    req.flash('error', t('Task not found'));
    return reply.redirect('/tasks');
  }
  await Task.query().deleteById(id);
  req.flash('success', t('Task was removed'));
  return reply.redirect('/tasks');
};
