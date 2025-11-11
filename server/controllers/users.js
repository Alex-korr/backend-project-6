import User from '../models/User.js';

export const index = async (request, reply) => {
  const users = await User.query();
  // Pass flash messages to template
  const error = request.session?.flash?.error || [];
  const success = request.session?.flash?.success || [];
  request.session.flash = {};
  return reply.view('users/index', { users, error, success });
};

export const newUser = async (request, reply) => {
  // Pass flash messages to template
  const error = request.session?.flash?.error || [];
  const success = request.session?.flash?.success || [];
  request.session.flash = {};
  return reply.view('users/new', { error, success });
};

export const create = async (request, reply) => {
  const { firstName, lastName, email, password } = request.body;

  try {
    const user = await User.query().insert({ firstName, lastName, email, password });
    return reply.redirect('/users');
  } catch (error) {
    // Handle validation errors
    return reply.view('users/new', { error: error.message });
  }
};

export const show = async (request, reply) => {
  const { id } = request.params;
  const user = await User.query().findById(id);
  if (!user) {
    return reply.code(404).send('User not found');
  }
  return reply.view('users/show', { user });
};

export const edit = async (request, reply) => {
  const { id } = request.params;
  const user = await User.query().findById(id);
  if (!user) {
    return reply.code(404).send('User not found');
  }
  return reply.view('users/edit', { user });
};

export const update = async (request, reply) => {
  const { id } = request.params;
  const { firstName, lastName, email, password } = request.body;

  try {
    await User.query().findById(id).patch({ firstName, lastName, email, password });
    return reply.redirect('/users');
  } catch (error) {
    const user = await User.query().findById(id);
    return reply.view('users/edit', { user, error: error.message });
  }
};

export const destroy = async (request, reply) => {
  const { id } = request.params;
  await User.query().deleteById(id);
  return reply.redirect('/users');
};