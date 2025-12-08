import User from '../models/User.cjs';


export const index = async (request, reply) => {
  const query = request.query || {};
  let users = await User.query();
  // Hide admin from regular users
  if (!request.user || request.user.role !== 'admin') {
    users = users.filter(u => u.role !== 'admin');
  }
  const error = request.session?.flash?.error || [];
  const success = request.session?.flash?.success || [];
  request.session.flash = {};
  const currentLang = request.cookies?.lang || 'en';
  return reply.view('users/index', {
    users,
    error,
    success,
    currentLang,
    t: request.i18next.t.bind(request.i18next),
    isAuthenticated: !!request.user,
    currentUser: request.user,
    currentUrl: request.raw.url,
    query,
  });
};

export const newUser = async (request, reply) => {
  const query = request.query || {};
  const error = request.session?.flash?.error || [];
  const success = request.session?.flash?.success || [];
  request.session.flash = {};
  const currentLang = request.cookies?.lang || 'en';
  return reply.view('users/new', { error, success, currentLang, t: request.i18next.t.bind(request.i18next), isAuthenticated: !!request.user, user: request.user, currentUrl: request.raw.url, query });
};

export const create = async (request, reply) => {
  // Handle both form data and JSON API requests
  const userData = request.body.data || request.body;
  const { firstName, lastName, email, password } = userData;
  const role = 'user';
  const currentLang = request.cookies?.lang || 'en';
  try {
    const user = await User.query().insert({ firstName, lastName, email, password, role });
    request.session.flash = { success: [request.i18next.t('flash.users.create.success')] };
    return reply.redirect('/');
  } catch (error) {
    request.session.flash = { error: [error.message] };
    return reply.redirect('/users/new');
  }
};

export const show = async (request, reply) => {
  const query = request.query || {};
  const { id } = request.params;
  const user = await User.query().findById(id);
  const currentLang = request.cookies?.lang || 'en';
  if (!user) {
    request.session.flash = { error: [request.i18next.t('User not found')] };
    return reply.redirect('/users');
  }
  return reply.view('users/show', { user, currentLang, t: request.i18next.t.bind(request.i18next), isAuthenticated: !!request.user, user: request.user, currentUrl: request.raw.url, query });
};

export const edit = async (request, reply) => {
  const query = request.query || {};
  const { id } = request.params;
  const user = await User.query().findById(id);
  const currentLang = request.cookies?.lang || 'en';
  if (!user) {
    request.session.flash = { error: [request.i18next.t('User not found')] };
    return reply.redirect('/users');
  }
  return reply.view('users/edit', { user, currentLang, t: request.i18next.t.bind(request.i18next), isAuthenticated: !!request.user, user: request.user, currentUrl: request.raw.url, query });
};

export const update = async (request, reply) => {
  console.log('=== UPDATE USER CALLED ===');
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);
  const { id } = request.params;
  console.log('User ID:', id);
  const { firstName, lastName, email, password } = request.body;
  console.log('Body data:', { firstName, lastName, email, passwordLength: password?.length });
  const currentLang = request.cookies?.lang || 'en';
  try {
    const updateData = { firstName, lastName, email };
    // Only update password if provided
    if (password && password.trim()) {
      updateData.password = password;
    }
    await User.query().findById(id).patch(updateData);
    request.session.flash = { success: [request.i18next.t('flash.users.update.success')] };
    return reply.redirect('/users');
  } catch (error) {
    console.error('=== UPDATE ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error data:', error.data);
    request.session.flash = { error: [error.message] };
    return reply.redirect(`/users/${id}/edit`);
  }
};

export const destroy = async (request, reply) => {
  const { id } = request.params;
  const user = await User.query().findById(id);
  const currentLang = request.cookies?.lang || 'en';
  // Role check
  if (!request.user || request.user.role !== 'admin') {
    request.session.flash = { error: [request.i18next.t('Only admin can delete users')] };
    return reply.redirect('/users');
  }
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