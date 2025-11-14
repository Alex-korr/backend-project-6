import { index, newLabel, create, edit, update, remove } from '../controllers/labels.js';

export default async (fastify) => {
  fastify.get('/labels', index);
  fastify.get('/labels/new', newLabel);
  fastify.post('/labels', create);
  fastify.get('/labels/:id/edit', edit);
  fastify.patch('/labels/:id', update);
  fastify.delete('/labels/:id', remove);
};
