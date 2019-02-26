import * as fastify from 'fastify';
import * as http from 'http';
import * as https from 'https';

import statusRoutes from '../status';

describe('/api/status', () => {
  let server: fastify.FastifyInstance<
    https.Server,
    http.IncomingMessage,
    http.ServerResponse
  >;

  beforeEach(async () => {
    server = fastify({});
    server.register(statusRoutes);
    await server.ready();

    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close(() => null);
  });

  it('GET returns 204', async done => {
    const response = await server.inject({ method: 'GET', url: '/api/status' });
    expect(response.statusCode).toEqual(204);
    done();
  });
});
