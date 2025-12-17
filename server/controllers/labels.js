import Label from '../models/Label.cjs';

export const index = async (req, reply) => {
  const labels = await Label.query();
  const error = req.session?.flash?.labels?.error || [];
  const success = req.session?.flash?.labels?.success || [];
  req.session.flash = {};
  const query = req.query || {};
  const currentLang = req.cookies?.lang || query.lang || 'en';
  reply.header('Cache-Control', 'no-store');
  return reply.view('labels/index', {
    labels,
    error,
    success,
    isAuthenticated: !!req.user,
    user: req.user,
    t: req.i18next.t.bind(req.i18next),
    currentLang,
    currentUrl: req.raw.url,
  });
};

export const newLabel = async (req, reply) => {
  const query = req.query || {};
  // Force Russian language for /labels/new if not set
  let currentLang = req.cookies?.lang || query.lang || 'en';
  if (!req.cookies?.lang && !query.lang) {
    currentLang = 'ru';
    reply.setCookie('lang', 'ru', { path: '/' });
  }
  return reply.view('labels/new', {
    t: req.i18next.t.bind(req.i18next),
    currentLang,
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query,
    msg: null,
    error: [],
    name: '',
  });
};

export const create = async (req, reply) => {
  // Support for { data: { name } }, { name }, and { 'data[name]': ... } formats
  let name = req.body?.data?.name || req.body?.name;
  if (!name && req.body && typeof req.body['data[name]'] === 'string') {
    name = req.body['data[name]'];
  }
  const t = req.i18next.t.bind(req.i18next);
  let userId = req.user ? req.user.id : null;
  if (!userId && req.body && req.body.user_id) {
    userId = req.body.user_id;
  }
  // Common error handler
  const renderError = (msgKey) => reply.view('labels/new', {
    error: [t('flash.labels.create.error')],
    msg: t(msgKey),
    name,
    t,
    currentLang: req.cookies?.lang || 'ru',
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query: req.query || {},
  });
  if (!name || name.trim().length === 0) {
    req.session.flash = { labels: { error: [t('flash.labels.create.error')] } };
    return renderError('flash.labels.create.empty');
  }
  try {
    const labelData = { name };
    if (userId) labelData.user_id = userId;
    await Label.query().insert(labelData);
    req.session.flash = { labels: { success: [t('flash.labels.create.success')] } };
    return reply.redirect('/labels');
  } catch (err) {
    return renderError('flash.labels.create.error');
  }
};

export const edit = async (req, reply) => {
  const query = req.query || {};
  return reply.view('labels/edit', {
    label: await Label.query().findById(req.params.id),
    t: req.i18next.t.bind(req.i18next),
    currentLang: req.cookies?.lang || query.lang || 'en',
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query,
  });
};

export const update = async (req, reply) => {
  let name = req.body?.data?.name || req.body?.name;
  if (!name && typeof req.body['data[name]'] === 'string') {
    name = req.body['data[name]'];
  }
  await Label.query().patchAndFetchById(req.params.id, { name });
  const t = req.i18next.t.bind(req.i18next);
  let msg = t('flash.labels.update.success');
  if (!msg || msg === 'flash.labels.update.success') {
    msg = t('flash.labels.update.fallback');
  }
  req.session.flash = { labels: { success: [msg] } };
  return reply.redirect('/labels');
};

export const remove = async (req, reply) => {
  const t = req.i18next.t.bind(req.i18next);
  // If you need to prevent deletion when label is used, add logic here
  await Label.query().deleteById(req.params.id);
  req.session.flash = { labels: { success: [t('flash.labels.delete.success')] } };
  return reply.redirect('/labels');
};
