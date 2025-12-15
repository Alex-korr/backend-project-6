/**
 * Fastify middleware: ensures user is authenticated
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} reply
 */
export default async function ensureAuthenticated(req, reply) {
  if (!req.user) {
    return reply.redirect('/session/new');
  }
}
