import fastifyPassport from '@fastify/passport';
export const newSession = async (request, reply) => {
  // Render login page with flash messages (custom session-based)
  const error = request.session.flash?.error || [];
  const success = request.session.flash?.success || [];
  // Clear flash after reading
  request.session.flash = {};
  // Pass empty error/success to layout, real ones only to content block
  return reply.view('sessions/new', { error, success, layoutError: [], layoutSuccess: [] });
};

export const create = async (request, reply) => {
  // Authenticate user using Passport local strategy
  // Clear flash before processing
  request.session.flash = {};
  return fastifyPassport.authenticate('local', async (err, user, info) => {
    if (err) {
  // Write only one error message
      request.session.flash = { error: ['Authentication error'] };
      return reply.redirect('/session/new');
    }
    if (!user) {
  // Write only one error message
      request.session.flash = { error: [info && info.message ? info.message : 'Invalid credentials'] };
      return reply.redirect('/session/new');
    }
    await request.logIn(user);
    // Store user in session for later requests
    request.session.user = user;
    // Write only one success message
    request.session.flash = { success: ['Successfully logged in'] };
    return reply.redirect('/users');
  })(request, reply);
};

export const destroy = async (request, reply) => {
  // Logout user and set flash message
  request.logout();
  request.session.flash = { success: ['Successfully logged out'] };
  return reply.redirect('/');
};