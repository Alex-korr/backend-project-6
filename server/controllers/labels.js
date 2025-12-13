import Label from '../models/Label.cjs';

export const index = async (req, reply) => {
  console.log('=== [LABELS CONTROLLER START] ===');
  console.log('INCOMING REQUEST:', {
    method: req.method,
    url: req.url,
    originalUrl: req.raw && req.raw.url,
    headers: req.headers,
    cookies: req.cookies,
    query: req.query,
    body: req.body,
    user: req.user,
    session: req.session,
  });
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
  console.log('LABELS CREATE CONTROLLER CALLED', {
    user: req.user && req.user.id,
    userObj: req.user,
    body: req.body,
    session: req.session,
    cookies: req.cookies,
    headers: req.headers,
    url: req.url,
    method: req.method,
  });
  // Support for { data: { name } }, { name }, and { 'data[name]': ... } formats
  let name = req.body?.data?.name || req.body?.name;
  if (!name && req.body && typeof req.body['data[name]'] === 'string') {
    name = req.body['data[name]'];
  }
  const t = req.i18next.t.bind(req.i18next);
  const query = req.query || {};
  let userId = req.user ? req.user.id : null;
  if (!userId && req.body && req.body.user_id) {
    userId = req.body.user_id;
    console.log('NO req.user, trying user_id from body:', userId);
  }
  // Common error handler
  const renderError = (msg) => reply.view('labels/new', {
    error: ['Не удалось создать метку'],
    msg,
    name,
    t,
    currentLang: req.cookies?.lang || 'ru',
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query,
  });
  if (!name || name.trim().length === 0) {
    console.log('LABEL CREATE VALIDATION ERROR: name is empty');
    // Set flash error for .alert
    req.session.flash = { labels: { error: ['Не удалось создать метку'] } };
    return renderError('Поле метки не может быть пустым');
  }
  try {
    const labelData = { name };
    if (userId) labelData.user_id = userId;
    console.log('INSERTING LABEL:', labelData);
    const label = await Label.query().insert(labelData);
    console.log('LABEL CREATED:', label);
    req.session.flash = { labels: { success: [t('flash.labels.create.success')] } };
    return reply.redirect('/labels');
  } catch (err) {
    console.error('ERROR CREATING LABEL:', err);
    return renderError('Не удалось создать метку');
  }
};

export const edit = async (req, reply) => {
  const query = req.query || {};
  const label = await Label.query().findById(req.params.id);
  return reply.view('labels/edit', {
    label,
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
  // Use translation if exists, fallback to default
  let msg = t('flash.labels.update.success');
  if (!msg || msg === 'flash.labels.update.success') {
    msg = 'Метка успешно изменена';
  }
  req.session.flash = { labels: { success: [msg] } };
  return reply.redirect('/labels');
};

export const remove = async (req, reply) => {
  const label = await Label.query().findById(req.params.id);
  const t = req.i18next.t.bind(req.i18next);
  // If you need to prevent deletion when label is used, add logic here
  await Label.query().deleteById(req.params.id);
  req.session.flash = { labels: { success: [t('flash.labels.delete.success')] } };
  return reply.redirect('/labels');
};
