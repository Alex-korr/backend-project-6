export default (app, options, done) => {
  // Home page
  app.get('/', (request, reply) => {
    const currentLang = request.query.lang || 'en';
    reply.view('index', { 
      t: request.i18next.t.bind(request.i18next),
      currentLang,
    });
  });

  done();
};
