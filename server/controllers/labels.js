import Label from '../models/Label.cjs';

export const index = async (req, reply) => {
  console.log('LABELS INDEX CONTROLLER CALLED', { user: req.user && req.user.id });
  const query = req.query || {};
  if (!req.user) {
    return reply.redirect('/session/new');
  }
  let labels = [];
  try {
    labels = await Label.query().where('user_id', req.user.id);
    console.log('LABELS FOR USER:', req.user.id, labels);
  } catch (err) {
    console.error('ERROR FETCHING LABELS:', err);
  }
  // Check if the client expects JSON
  const accept = req.headers.accept || '';
  if (accept.includes('application/json')) {
    return reply.send({ data: labels });
  }
  const error = req.session?.flash?.labels?.error || [];
  const success = req.session?.flash?.labels?.success || [];
  req.session.flash = {};
  return reply.view('labels/index', {
    labels,
    error,
    success,
    t: req.i18next.t.bind(req.i18next),
    currentLang: req.cookies?.lang || query.lang || 'en',
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query,
  });
};

export const newLabel = async (req, reply) => {
  const query = req.query || {};
  return reply.view('labels/new', {
    t: req.i18next.t.bind(req.i18next),
    currentLang: req.cookies?.lang || query.lang || 'en',
    isAuthenticated: !!req.user,
    user: req.user,
    currentUrl: req.raw.url,
    query,
  });
};

export const create = async (req, reply) => {
    console.log('LABELS CREATE CONTROLLER CALLED', { user: req.user && req.user.id, body: req.body });
  const { name } = req.body;
  const userId = req.user.id;
  try {
    const label = await Label.query().insert({ name, user_id: userId });
    console.log('LABEL CREATED:', label);
  } catch (err) {
    console.error('ERROR CREATING LABEL:', err);
  }
  return reply.redirect('/labels');
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
  const { name } = req.body;
  await Label.query().patchAndFetchById(req.params.id, { name });
  return reply.redirect('/labels');
};

export const remove = async (req, reply) => {
  const label = await Label.query().findById(req.params.id).withGraphFetched('tasks');
  const t = req.i18next.t.bind(req.i18next);
  if (label.tasks && label.tasks.length > 0) {
    req.session.flash = { labels: { error: [t('flash.labels.delete.error')] } };
    return reply.redirect('/labels');
  }
  await Label.query().deleteById(req.params.id);
  req.session.flash = { labels: { success: [t('flash.labels.delete.success')] } };
  return reply.redirect('/labels');
};
