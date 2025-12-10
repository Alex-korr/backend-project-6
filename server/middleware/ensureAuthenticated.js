export default async function ensureAuthenticated(req, reply) {
  console.log('ensureAuthenticated middleware called, req.user:', req.user, 'url:', req.url);
  if (!req.user) {
    console.log('User not authenticated, redirecting to /session/new', 'url:', req.url);
    return reply.redirect('/session/new');
  }
  console.log('User authenticated, proceeding to next handler', 'user:', req.user && req.user.id, 'url:', req.url);
  // If using Fastify v3+ with async middleware, just return; otherwise, call next()
  // next();
}
