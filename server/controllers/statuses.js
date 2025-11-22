// Statuses controller
import TaskStatus from '../models/TaskStatus.js';

export const index = async (req, reply) => {
  const statuses = await TaskStatus.query();
  const error = req.session?.flash?.status?.error || [];
  const success = req.session?.flash?.status?.success || [];
  req.session.flash = {};
  const currentLang = req.cookies?.lang || req.session?.lang || 'en';
  return reply.view('statuses/index', {
    statuses,
    error,
    success,
    isAuthenticated: !!req.user,
    user: req.user,
    t: req.i18next.t.bind(req.i18next),
    currentLang,
  });
};

export const newStatus = async (req, reply) => {
  return reply.view('statuses/new', {
    isAuthenticated: !!req.user,
    user: req.user,
    t: req.i18next.t.bind(req.i18next),
  });
};

export const create = async (req, reply) => {
  const { name } = req.body;
  try {
    await TaskStatus.query().insert({ name });
    req.session.flash = { status: { success: ['Status created successfully'] } };
    reply.redirect('/statuses');
  } catch (err) {
    reply.view('statuses/new', {
      error: err.message,
      isAuthenticated: !!req.user,
      user: req.user,
      t: req.i18next.t.bind(req.i18next),
    });
  }
};

export const edit = async (req, reply) => {
  const { id } = req.params;
  const status = await TaskStatus.query().findById(id);
  if (!status) return reply.code(404).send('Status not found');
  return reply.view('statuses/edit', {
    status,
    isAuthenticated: !!req.user,
    user: req.user,
    t: req.i18next.t.bind(req.i18next),
  });
};

export const update = async (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await TaskStatus.query().findById(id).patch({ name });
    req.session.flash = { status: { success: ['Status updated successfully'] } };
    reply.redirect('/statuses');
  } catch (err) {
    const status = await TaskStatus.query().findById(id);
    reply.view('statuses/edit', {
      status,
      error: err.message,
      isAuthenticated: !!req.user,
      user: req.user,
      t: req.i18next.t.bind(req.i18next),
    });
  }
};

export const remove = async (req, reply) => {
  const { id } = req.params;
  // Use Task model to check for related tasks
  const Task = (await import('../models/Task.js')).default;
  const relatedTasks = await Task.query().where('statusId', id);
  if (relatedTasks.length > 0) {
    req.session.flash = { status: { error: ['Cannot delete status with related tasks'] } };
    return reply.redirect('/statuses');
  }
  await TaskStatus.query().deleteById(id);
  req.session.flash = { status: { success: ['Status deleted successfully'] } };
  reply.redirect('/statuses');
};
