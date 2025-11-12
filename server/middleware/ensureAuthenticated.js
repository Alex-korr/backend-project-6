// Middleware to check if user is authenticated
export default function ensureAuthenticated(req, reply, done) {
  if (!req.user) {
    reply.redirect('/session/new');
    return;
  }
  done();
}
