export default async function ensureAuthenticated(req, reply) {
  if (!req.user) {
    return reply.redirect('/session/new');
  }
  // If using Fastify v3+ with async middleware, just return; otherwise, call next()
  // next();
}
