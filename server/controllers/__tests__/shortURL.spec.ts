import * as config from 'config';
import * as fastify from 'fastify';
import * as typeorm from 'typeorm';

import fastifyConfig from '../../config';
import dbPlugin from '../../db';
import { serverOptions } from '../../server';
import shortURLRoutes from '../shortURL';

jest.mock('shortid', () => () => 'someUniqShortURL');
jest
  .spyOn(typeorm, 'createConnection')
  .mockResolvedValue({ runMigrations: jest.fn() } as any);

describe('/api/shortURL', () => {
  let server;

  beforeEach(async () => {
    server = fastify(serverOptions);
    server.register(fastifyConfig, config);
    server.register(dbPlugin).ready();
    server.register(shortURLRoutes);
    await server.ready();

    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close.bind(server);
  });

  describe('GET /:shortURL', () => {
    it('should return a 200', async done => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/shortURL/shortURL',
      });

      expect(response.statusCode).toEqual(200);
      expect(response.payload).toEqual(
        JSON.stringify({ redirectURL: 'redirectURL' })
      );
      done();
    });

    xit('should return a 404', async done => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/shortURL',
      });

      expect(response.statusCode).toEqual(404);
      done();
    });

    xit('should return a 400', async done => {
      server.db.getRepository.findOne = jest.fn(() =>
        Promise.reject('My error')
      );

      const response = await server.inject({
        method: 'GET',
        url: '/api/shortURL/shortURL',
      });

      expect(response.statusCode).toEqual(400);
      expect(response.payload).toEqual(JSON.stringify({ error: 'My error' }));
      done();
    });
  });

  xdescribe('POST /', () => {
    it('should return a 201', async done => {
      server.redis.set = jest.fn(() => Promise.resolve('done'));

      const response = await server.inject({
        method: 'POST',
        url: '/api/shortURL',
        payload: { redirectURL: 'http://domain.tld' },
        headers: {
          origin: 'http://shortnr',
        },
      });

      expect(response.statusCode).toEqual(201);
      expect(response.headers['location-id']).toEqual(
        'http://shortnr/someUniqShortURL'
      );
      done();
    });

    it('should return a 400', async done => {
      server.redis.set = jest.fn(() => Promise.reject('My error'));

      const response = await server.inject({
        method: 'POST',
        url: '/api/shortURL',
        payload: { redirectURL: 'redirectURL' },
      });

      expect(response.statusCode).toEqual(400);
      expect(response.payload).toEqual(
        JSON.stringify({
          error: 'Error: http://redirecturl is not a valid URL',
        })
      );
      done();
    });
  });
});
