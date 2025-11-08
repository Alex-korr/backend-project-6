export default (app, options, done) => {
  // Home page
  app.get('/', (request, reply) => {
    reply.view('index');
  });

  done();
};
