import ensureAuthenticated from '../middleware/ensureAuthenticated.js';
import tasksController from '../controllers/tasks.js';

export default async (fastify) => {
  fastify.get('/tasks', tasksController.index);
  fastify.get('/tasks/new', { preHandler: ensureAuthenticated }, tasksController.newTask);
  fastify.post('/tasks', { preHandler: ensureAuthenticated }, tasksController.create);
  fastify.get('/tasks/:id', tasksController.show);
  fastify.get('/tasks/:id/edit', { preHandler: ensureAuthenticated }, tasksController.edit);
  fastify.patch('/tasks/:id', { preHandler: ensureAuthenticated }, tasksController.update);
  fastify.delete('/tasks/:id', { preHandler: ensureAuthenticated }, tasksController.remove);
};
