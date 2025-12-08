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
  const validationErrors = request.session?.flash?.validationErrors || {};
  request.session.flash = {};
  const currentLang = request.cookies?.lang || 'en';
  return reply.view('users/new', { error, success, validationErrors, currentLang, t: request.i18next.t.bind(request.i18next), isAuthenticated: !!request.user, user: request.user, currentUrl: request.raw.url, query });
};

export const create = async (request, reply) => {
  // Handle both form data and JSON API requests
  const userData = request.body.data || request.body;
  const { firstName, lastName, email, password } = userData;
  const role = 'user';
  const currentLang = request.cookies?.lang || 'en';
  
  // Validate required fields
  const errors = {};
  let hasErrors = false;
  
  if (!firstName || firstName.trim() === '') {
    errors.firstName = request.i18next.t('First name is required');
    hasErrors = true;
  }
  if (!lastName || lastName.trim() === '') {
    errors.lastName = request.i18next.t('Last name is required');
    hasErrors = true;
  }
  if (!email || email.trim() === '') {
    errors.email = request.i18next.t('Email is required');
    hasErrors = true;
  }
  if (!password || password.length < 3) {
    errors.password = request.i18next.t('Password must be at least 3 characters');
    hasErrors = true;
  }
  
  if (hasErrors) {
    request.session.flash = { error: [request.i18next.t('flash.users.create.error')], validationErrors: errors };
    return reply.redirect('/users');
  }
  
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
  
  // Check if user is authenticated
  if (!request.user) {
    request.session.flash = { error: [request.i18next.t('You must be logged in')] };
    return reply.redirect('/users');
  }
  
  // Allow user to delete themselves OR admin to delete regular users
  const canDelete = request.user.id === parseInt(id) || 
                   (request.user.role === 'admin' && user?.role === 'user');
  
  if (!canDelete) {
    request.session.flash = { error: [request.i18next.t('You cannot delete this user')] };
    return reply.redirect('/users');
  }
  
  if (!user) {
    request.session.flash = { error: [request.i18next.t('User not found or already deleted')] };
    return reply.redirect('/users');
  }
  
  // Check for related tasks (optional - can be removed if not needed)
  // const tasksAsCreator = await User.relatedQuery('tasks').for(id).where('creatorId', id);
  // const tasksAsExecutor = await User.relatedQuery('tasks').for(id).where('executorId', id);
  // if (tasksAsCreator.length > 0 || tasksAsExecutor.length > 0) {
  //   request.session.flash = { error: [request.i18next.t('Cannot delete user with related tasks')] };
  //   return reply.redirect('/users');
  // }
  
  await User.query().deleteById(id);
  
  // Set flash message
  request.session.flash = { success: [request.i18next.t('flash.users.delete.success')] };
  
  // If user deleted themselves, logout (clear session after flash is set)
  if (request.user.id === parseInt(id)) {
    await request.logOut();
  }
  
  return reply.redirect('/users');
};