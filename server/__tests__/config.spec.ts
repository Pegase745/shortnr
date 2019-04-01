import * as fastify from 'fastify';

import fastifyConfig from '../config';
import { serverOptions } from '../server';

describe('server/config', () => {
  let server: fastify.FastifyInstance;

  beforeEach(async () => {
    server = fastify(serverOptions);
    server.register(fastifyConfig, {});
    await server.ready();

    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close.bind(server);
  });

  it('should have a config object', () => {
    expect(server.config).toEqual({});
  });
});
