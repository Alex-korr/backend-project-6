// Statuses controller
import TaskStatus from '../models/TaskStatus.js';

export const index = async (req, reply) => {
  const statuses = await TaskStatus.query();
  return reply.view('statuses/index', { statuses });
};

export const newStatus = async (req, reply) => {
  return reply.view('statuses/new');
};

export const create = async (req, reply) => {
  const { name } = req.body;
  try {
    await TaskStatus.query().insert({ name });
    req.session.flash = { success: ['Status created successfully'] };
    reply.redirect('/statuses');
  } catch (err) {
    reply.view('statuses/new', { error: err.message });
  }
};

export const edit = async (req, reply) => {
  const { id } = req.params;
  const status = await TaskStatus.query().findById(id);
  if (!status) return reply.code(404).send('Status not found');
  return reply.view('statuses/edit', { status });
};

export const update = async (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await TaskStatus.query().findById(id).patch({ name });
    req.session.flash = { success: ['Status updated successfully'] };
    reply.redirect('/statuses');
  } catch (err) {
    const status = await TaskStatus.query().findById(id);
    reply.view('statuses/edit', { status, error: err.message });
  }
};

export const destroy = async (req, reply) => {
  const { id } = req.params;
  await TaskStatus.query().deleteById(id);
  req.session.flash = { success: ['Status deleted successfully'] };
  reply.redirect('/statuses');
};
