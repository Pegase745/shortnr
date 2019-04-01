import * as fastify from 'fastify';

import { serverOptions } from '../../server';
import statusRoutes from '../status';

describe('/api/status', () => {
  let server: fastify.FastifyInstance;

  beforeEach(async () => {
    server = fastify(serverOptions);
    server.register(statusRoutes);
    await server.ready();

    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close.bind(server);
  });

  describe('GET /', () => {
    it('should return a 204', async done => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/status',
      });
      expect(response.statusCode).toEqual(204);
      done();
    });
  });
});
