// Statuses controller
import TaskStatus from '../models/TaskStatus.cjs';

export const index = async (req, reply) => {
  const statuses = await TaskStatus.query();
  const error = req.session?.flash?.status?.error || [];
  const success = req.session?.flash?.status?.success || [];
  req.session.flash = {};
  const query = req.query || {};
  const currentLang = req.cookies?.lang || query.lang || 'en';
  reply.header('Cache-Control', 'no-store');
  return reply.view('statuses/index', {
    statuses,
    error,
    success,
    isAuthenticated: !!req.user,
    user: req.user,
    t: req.i18next.t.bind(req.i18next),
    currentLang,
    currentUrl: req.raw.url,
  });
};

export const newStatus = async (req, reply) => {
  const query = req.query || {};
  const currentLang = req.cookies?.lang || query.lang || 'en';
  return reply.view('statuses/new', {
    isAuthenticated: !!req.user,
    user: req.user,
    t: req.i18next.t.bind(req.i18next),
    currentLang,
    currentUrl: req.raw.url,
    error: null,
  });
};

export const create = async (req, reply) => {
  const name = req.body.name || (req.body.data && req.body.data.name);
  // DEBUG: Check form parsing

  // Server-side validation: status name must not be empty
  if (!name || name.trim().length < 1) {
    const errors = ['Имя статуса не может быть пустым'];
    return reply.code(422).view('statuses/new', {
      errors,
      alert: 'Не удалось создать статус',
      name,
      isAuthenticated: !!req.user,
      user: req.user,
      t: req.i18next.t.bind(req.i18next),
      currentLang: req.cookies?.lang || 'en',
      currentUrl: req.raw.url,
    });
  }
  try {
    const status = await TaskStatus.query().insert({ name });
    if (req.session && req.i18next) {
      let successMsg = req.i18next.t('flash.statuses.create.success');
      if (successMsg === 'flash.statuses.create.success') {
        successMsg = 'Status created successfully.';
      }
      req.session.flash = { status: { success: [successMsg] } };
    }
    reply.redirect('/statuses');
  } catch (err) {
    // Build array of errors for template
    const errors = [err.message];
    reply.code(422).view('statuses/new', {
      errors,
      alert: 'Не удалось создать статус',
      name,
      isAuthenticated: !!req.user,
      user: req.user,
      t: req.i18next.t.bind(req.i18next),
      currentLang: req.cookies?.lang || 'en',
      currentUrl: req.raw.url,
    });
  }
};

export const edit = async (req, reply) => {
  const { id } = req.params;
  const status = await TaskStatus.query().findById(id);
  if (!status) return reply.code(404).send('Status not found');
  const query = req.query || {};
  return reply.view('statuses/edit', {
    status,
    isAuthenticated: !!req.user,
    user: req.user,
    t: req.i18next.t.bind(req.i18next),
    currentLang: req.cookies?.lang || query.lang || 'en',
    currentUrl: req.raw.url,
    query,
  });
};

export const update = async (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await TaskStatus.query().findById(id).patch({ name });
    req.session.flash = { status: { success: [req.i18next.t('flash.statuses.update.success')] } };
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
  let relatedTasks = [];
  try {
    const Task = (await import('../models/Task.cjs')).default;
    relatedTasks = await Task.query().whereRaw('statusId = ?', [id]);
    if (relatedTasks.length > 0) {
      const errorMsg = req.i18next.t('flash.statuses.delete.error');
      req.session.flash = { status: { error: [errorMsg] } };
      return reply.redirect(303, '/statuses');
    }
  } catch (err) {

    // Continue status deletion even if error occurs

  }
  await TaskStatus.query().deleteById(id);
  let successMsg = req.i18next.t('flash.statuses.delete.success');
  if (successMsg === 'flash.statuses.delete.success') {
    successMsg = 'Status deleted successfully.';
  }
  req.session.flash = { status: { success: [successMsg] } };
  return reply.redirect(303, '/statuses');
};
