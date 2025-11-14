import Label from '../models/Label.js';

export const index = async (req, reply) => {
  const labels = await Label.query();
  return reply.view('labels/index', { labels });
};

export const newLabel = async (req, reply) => {
  return reply.view('labels/new');
};

export const create = async (req, reply) => {
  const { name } = req.body;
  await Label.query().insert({ name });
  return reply.redirect('/labels');
};

export const edit = async (req, reply) => {
  const label = await Label.query().findById(req.params.id);
  return reply.view('labels/edit', { label });
};

export const update = async (req, reply) => {
  const { name } = req.body;
  await Label.query().patchAndFetchById(req.params.id, { name });
  return reply.redirect('/labels');
};

export const remove = async (req, reply) => {
  const label = await Label.query().findById(req.params.id).withGraphFetched('tasks');
  if (label.tasks && label.tasks.length > 0) {
    // Если метка связана с задачами, удалять нельзя
    return reply.code(400).send('Нельзя удалить связанную метку');
  }
  await Label.query().deleteById(req.params.id);
  return reply.redirect('/labels');
};
