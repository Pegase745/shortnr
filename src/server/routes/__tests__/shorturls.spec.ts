import * as fastify from 'fastify';
import * as http from 'http';
import * as https from 'https';

import shortUrlsRoutes from '../shorturls';

jest.mock('uniqid', () => () => 'someUniqShortURL');

describe('/api/shorturls', () => {
  let server: fastify.FastifyInstance<
    https.Server,
    http.IncomingMessage,
    http.ServerResponse
  >;

  beforeEach(async () => {
    server = fastify({});
    server.register(require('fastify-redis'), {
      host: '',
    });
    server.register(shortUrlsRoutes);
    await server.ready();

    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close(() => null);
  });

  describe('GET /:shortURL', () => {
    it('should return a 200', async done => {
      server.redis.get = jest.fn(() => Promise.resolve('redirectURL'));

      const response = await server.inject({
        method: 'GET',
        url: '/api/shorturls/shortURL',
      });

      expect(response.statusCode).toEqual(200);
      expect(response.payload).toEqual(
        JSON.stringify({ redirectURL: 'redirectURL' })
      );
      done();
    });

    it('should return a 404', async done => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/shorturls',
      });

      expect(response.statusCode).toEqual(404);
      done();
    });

    it('should return a 400', async done => {
      server.redis.get = jest.fn(() => Promise.reject('My error'));

      const response = await server.inject({
        method: 'GET',
        url: '/api/shorturls/shortURL',
      });

      expect(response.statusCode).toEqual(400);
      expect(response.payload).toEqual(JSON.stringify({ error: 'My error' }));
      done();
    });
  });

  describe('POST /', () => {
    it('should return a 201', async done => {
      server.redis.set = jest.fn(() => Promise.resolve('done'));

      const response = await server.inject({
        method: 'POST',
        url: '/api/shorturls',
        payload: { redirectURL: 'redirectURL' },
      });

      expect(response.statusCode).toEqual(201);
      expect(response.headers['location-id']).toEqual('someUniqShortURL');
      done();
    });

    it('should return a 400', async done => {
      server.redis.set = jest.fn(() => Promise.reject('My error'));

      const response = await server.inject({
        method: 'POST',
        url: '/api/shorturls',
        payload: { redirectURL: 'redirectURL' },
      });

      expect(response.statusCode).toEqual(400);
      expect(response.payload).toEqual(JSON.stringify({ error: 'My error' }));
      done();
    });
  });
});
