import fastifyPassport from '@fastify/passport';
export const newSession = async (request, reply) => {
  // Render login page with flash messages (custom session-based)
  const error = request.session.flash?.error || [];
  const success = request.session.flash?.success || [];
  // Clear flash after reading
  request.session.flash = {};
  // Pass empty error/success to layout, real ones only to content block
  return reply.view('sessions/new', {
    error,
    success,
    layoutError: [],
    layoutSuccess: [],
    t: request.i18next.t.bind(request.i18next),
    currentLang: request.cookies?.lang || request.query.lang || 'en',
  });
};

export const create = async (request, reply) => {
  // После успешной аутентификации Passport, request.user уже определён
  request.session.flash = {};
  if (!request.user) {
    request.session.flash = { error: ['Invalid credentials'] };
    return reply.redirect('/session/new');
  }
  request.session.flash = { success: ['Successfully logged in'] };
  return reply.redirect('/users');
};

export const destroy = async (request, reply) => {
  // Logout user and set flash message
  request.logout();
  request.session.flash = { success: ['Successfully logged out'] };
  return reply.redirect('/');
};