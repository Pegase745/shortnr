import * as fastify from 'fastify';
import * as fp from 'fastify-plugin';
import * as http from 'http';

export default fp(async (server, opts, next) => {
  /**
   * GET /api/status
   * Return 204 empty status.
   */
  const getStatusOpts = {
    schema: {
      response: {
        204: {
          type: 'null',
        },
      },
    },
  };

  const getStatusHandler = async (
    req: fastify.FastifyRequest<http.IncomingMessage>,
    reply: fastify.FastifyReply<http.ServerResponse>
  ) => {
    reply.code(204);
  };

  server.get('/api/status', getStatusOpts, getStatusHandler);

  next();
});
