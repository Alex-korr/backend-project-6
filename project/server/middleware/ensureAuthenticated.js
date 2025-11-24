export default async function ensureAuthenticated(req, reply) {
  console.log('ensureAuthenticated middleware called, req.user:', req.user);
  if (!req.user) {
    console.log('User not authenticated, redirecting to /session/new');
    return reply.redirect('/session/new');
  }
}
