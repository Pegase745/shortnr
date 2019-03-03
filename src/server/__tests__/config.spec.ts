import * as fastify from 'fastify';
import * as http from 'http';
import * as https from 'https';

import config from '../config';

describe('server/config', () => {
  let server: fastify.FastifyInstance<
    https.Server,
    http.IncomingMessage,
    http.ServerResponse
  >;

  beforeEach(async () => {
    server = fastify({});
    server.register(config, {});
    await server.ready();

    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close(() => null);
  });

  it('should have a config object', () => {
    expect(server.config).toEqual({});
  });
});
