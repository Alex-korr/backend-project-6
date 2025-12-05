import fastifyPassport from '@fastify/passport';

export const newSession = async (request, reply) => {
  try {
    // Safely get query params
    const query = request.query ? { ...request.query } : {};
    
    // Safely get flash messages
    let error = [];
    let success = [];
    
    if (request.session && 
        request.session.flash && 
        Array.isArray(request.session.flash.error)) {
      error = [...request.session.flash.error];
    }
    
    if (request.session && 
        request.session.flash && 
        Array.isArray(request.session.flash.success)) {
      success = [...request.session.flash.success];
    }
    
    // Clear flash messages after reading
    if (request.session && request.session.flash) {
      request.session.flash = {};
    }
    
    const currentLang = request.cookies?.lang || query.lang || 'en';
    
    return reply.view('sessions/new', {
      error,
      success,
      layoutError: [],
      layoutSuccess: [],
      t: request.i18next.t.bind(request.i18next),
      currentLang,
      query,
      isAuthenticated: !!request.user,
      currentUser: request.user || null,
    });
  } catch (error) {
    console.error('Error in newSession controller:', error);
    // Render page with generic error
    return reply.view('sessions/new', {
      error: ['An error occurred. Please try again.'],
      success: [],
      layoutError: [],
      layoutSuccess: [],
      t: request.i18next.t.bind(request.i18next),
      currentLang: 'en',
      query: {},
      isAuthenticated: false,
      currentUser: null,
    });
  }
};

// This function is no longer used - login is handled directly in the route
// But we keep it for compatibility
export const create = async (request, reply) => {
  console.warn('DEPRECATED: sessionsController.create called - login is now handled in route handler');
  
  // If somehow this is called, redirect to home
  if (request.user) {
    return reply.redirect('/');
  } else {
    return reply.redirect('/session/new');
  }
};

export const destroy = async (request, reply) => {
  try {
    console.log('Logout attempt for user:', request.user?.id);
    
    // Log out the user
    if (request.logout && typeof request.logout === 'function') {
      await new Promise((resolve, reject) => {
        request.logout((err) => {
          if (err) {
            console.error('Logout error:', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
    
    // Clear session
    if (request.session) {
      if (typeof request.session.delete === 'function') {
        await request.session.delete();
      }
      
      // Create new session with message
      request.session.flash = { success: ['Successfully logged out'] };
    }
    
    // Clear session cookie
    reply.clearCookie('session', { 
      path: '/',
      httpOnly: true
    });
    
    console.log('User logged out successfully');
    return reply.redirect('/');
    
  } catch (error) {
    console.error('Error in destroy session controller:', error);
    
    // Even on error, try to redirect
    if (request.session) {
      request.session.flash = { 
        error: ['Error during logout. Please try again.'] 
      };
    }
    
    return reply.redirect('/');
  }
};

// Optional: Add a helper function for login if needed elsewhere
export const loginUser = async (request, reply, user) => {
  try {
    await request.logIn(user);
    request.session.flash = { success: ['Successfully logged in!'] };
    return true;
  } catch (error) {
    console.error('Login helper error:', error);
    request.session.flash = { error: ['Login failed'] };
    return false;
  }
};