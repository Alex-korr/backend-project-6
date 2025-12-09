// Statuses controller
import TaskStatus from '../models/TaskStatus.cjs';

export const index = async (req, reply) => {
  const statuses = await TaskStatus.query();
  console.log('DEBUG statuses/index: Found', statuses.length, 'statuses:', statuses.map(s => s.name));
  const error = req.session?.flash?.status?.error || [];
  const success = req.session?.flash?.status?.success || [];
  req.session.flash = {};
    const query = req.query || {};
    const currentLang = req.cookies?.lang || query.lang || 'en';
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
  });
};

export const create = async (req, reply) => {
  const { name } = req.body;
  console.log('DEBUG statuses/create: name =', name);
  try {
    const created = await TaskStatus.query().insert({ name });
    console.log('DEBUG statuses/create: Created status:', created);
    let successMsg = req.i18next.t('flash.statuses.create.success');
    console.log('DEBUG: Translation for flash.statuses.create.success:', successMsg, 'lang:', req.i18next.language);
    if (successMsg === 'flash.statuses.create.success') {
      successMsg = 'Status created successfully.';
    }
    req.session.flash = { status: { success: [successMsg] } };
    reply.redirect('/statuses');
  } catch (err) {
    console.log('DEBUG statuses/create: ERROR:', err.message);
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
  const Task = (await import('../models/Task.cjs')).default;
  const relatedTasks = await Task.query().whereRaw('statusId = ?', [id]);
  if (relatedTasks.length > 0) {
    const errorMsg = req.i18next.t('flash.statuses.delete.error');
    console.log('DEBUG: Translation for flash.statuses.delete.error:', errorMsg, 'lang:', req.i18next.language);
    req.session.flash = { status: { error: [errorMsg] } };
    return reply.redirect('/statuses');
  }
  await TaskStatus.query().deleteById(id);
  let successMsg = req.i18next.t('flash.statuses.delete.success');
  console.log('DEBUG: Translation for flash.statuses.delete.success:', successMsg, 'lang:', req.i18next.language);
  if (successMsg === 'flash.statuses.delete.success') {
    successMsg = 'Status deleted successfully.';
  }
  req.session.flash = { status: { success: [successMsg] } };
  reply.redirect('/statuses');
};
