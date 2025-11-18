
import User from '../models/User.js';

function getLang(request) {
  return request.query.lang || request.session?.lang || request.cookies?.lang || 'en';
}

function setLang(request, lang) {
  request.session.lang = lang;
  request.cookies.lang = lang;
}

export const changeLang = async (request, reply) => {
  const { lang } = request.params;
  if (['en', 'ru'].includes(lang)) {
    setLang(request, lang);
  }
  reply.redirect(request.headers.referer || '/');
};

export const index = async (request, reply) => {
  const users = await User.query();
  const error = request.session?.flash?.error || [];
  const success = request.session?.flash?.success || [];
  request.session.flash = {};
  const currentLang = getLang(request);
  return reply.view('users/index', {
    users,
    error,
    success,
    currentLang,
    t: request.i18next.t.bind(request.i18next),
  });
};

export const newUser = async (request, reply) => {
  const error = request.session?.flash?.error || [];
  const success = request.session?.flash?.success || [];
  request.session.flash = {};
  const currentLang = getLang(request);
  return reply.view('users/new', { error, success, currentLang, t: request.i18next.t.bind(request.i18next) });
};

export const create = async (request, reply) => {
  const { firstName, lastName, email, password } = request.body;
  const currentLang = getLang(request);
  try {
    await User.query().insert({ firstName, lastName, email, password });
    request.session.flash = { success: [request.i18next.t('User created successfully')] };
    return reply.redirect('/users');
  } catch (error) {
    request.session.flash = { error: [error.message] };
    return reply.redirect('/users/new');
  }
};

export const show = async (request, reply) => {
  const { id } = request.params;
  const user = await User.query().findById(id);
  const currentLang = getLang(request);
  if (!user) {
    request.session.flash = { error: [request.i18next.t('User not found')] };
    return reply.redirect('/users');
  }
  return reply.view('users/show', { user, currentLang, t: request.i18next.t.bind(request.i18next) });
};

export const edit = async (request, reply) => {
  const { id } = request.params;
  const user = await User.query().findById(id);
  const currentLang = getLang(request);
  if (!user) {
    request.session.flash = { error: [request.i18next.t('User not found')] };
    return reply.redirect('/users');
  }
  return reply.view('users/edit', { user, currentLang, t: request.i18next.t.bind(request.i18next) });
};

export const update = async (request, reply) => {
  const { id } = request.params;
  const { firstName, lastName, email, password } = request.body;
  const currentLang = getLang(request);
  try {
    await User.query().findById(id).patch({ firstName, lastName, email, password });
    request.session.flash = { success: [request.i18next.t('User updated successfully')] };
    return reply.redirect('/users');
  } catch (error) {
    request.session.flash = { error: [error.message] };
    return reply.redirect(`/users/${id}/edit`);
  }
};

export const destroy = async (request, reply) => {
  const { id } = request.params;
  const user = await User.query().findById(id);
  const currentLang = getLang(request);
  if (!user) {
    request.session.flash = { error: [request.i18next.t('User not found or already deleted')] };
    return reply.redirect('/users');
  }
  // Check for related tasks
  const tasksAsCreator = await User.relatedQuery('tasks').for(id).where('creatorId', id);
  const tasksAsExecutor = await User.relatedQuery('tasks').for(id).where('executorId', id);
  if (tasksAsCreator.length > 0 || tasksAsExecutor.length > 0) {
    request.session.flash = { error: [request.i18next.t('Cannot delete user with related tasks')] };
    return reply.redirect('/users');
  }
  await User.query().deleteById(id);
  request.session.flash = { success: [request.i18next.t('User successfully deleted')] };
  return reply.redirect('/users');
};