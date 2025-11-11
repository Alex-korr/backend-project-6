import fastifyPassport from '@fastify/passport';
export const newSession = async (request, reply) => {
  // Render login page with flash messages (custom session-based)
  const error = request.session.flash?.error || [];
  const success = request.session.flash?.success || [];
  // Clear flash after reading
  request.session.flash = {};
  // Передаём пустые error/success в layout, а реальные — только в блок content
  return reply.view('sessions/new', { error, success, layoutError: [], layoutSuccess: [] });
};

export const create = async (request, reply) => {
  // Authenticate user using Passport local strategy
  // Очистить flash перед обработкой
  request.session.flash = {};
  return fastifyPassport.authenticate('local', async (err, user, info) => {
    if (err) {
      // Записать только одно сообщение об ошибке
      request.session.flash = { error: ['Authentication error'] };
      return reply.redirect('/session/new');
    }
    if (!user) {
      // Записать только одно сообщение об ошибке
      request.session.flash = { error: [info && info.message ? info.message : 'Invalid credentials'] };
      return reply.redirect('/session/new');
    }
    await request.logIn(user);
    // Записать только одно сообщение об успехе
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