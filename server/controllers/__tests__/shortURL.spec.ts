import * as config from 'config';
import * as fastify from 'fastify';
import * as typeorm from 'typeorm';

import fastifyConfig from '../../config';
import dbPlugin from '../../db';
import { serverOptions } from '../../server';
import MockShortURLService from '../../services/__tests__/utils/MockShortURLService';
import shortURLRoutes from '../shortURL';

jest.spyOn(typeorm, 'createConnection').mockResolvedValue({
  runMigrations: jest.fn(),
  getRepository: jest.fn(),
} as any);

const mockedShortURLService = new MockShortURLService();
jest.mock('../../services/ShortURLService', () => ({
  default: () => mockedShortURLService,
}));

describe('/api/shorturls', () => {
  let server: fastify.FastifyInstance;

  beforeEach(async () => {
    server = fastify(serverOptions);
    server.register(fastifyConfig, config);
    server.register(dbPlugin).ready();
    server.register(shortURLRoutes);
    await server.ready();

    mockedShortURLService.reset();
  });

  afterAll(() => {
    server.close.bind(server);
  });

  describe('GET /:shortURL', () => {
    it('should return a 200', async done => {
      mockedShortURLService.createWithId('shortURL', 'shortnr.local');

      const response = await server.inject({
        method: 'GET',
        url: '/api/shorturls/shortURL',
      });

      expect(response.statusCode).toEqual(200);

      const parsedPayload = JSON.parse(response.payload);
      expect(parsedPayload).toHaveProperty('redirectURL');
      expect(parsedPayload.redirectURL).toEqual('shortnr.local');
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

    it('should return a 500', async done => {
      mockedShortURLService.activateThrowErrorMode();

      const response = await server.inject({
        method: 'GET',
        url: '/api/shorturls/shortURL',
      });

      expect(response.statusCode).toEqual(500);

      const parsedPayload = JSON.parse(response.payload);
      expect(parsedPayload).toHaveProperty('message');
      expect(parsedPayload.message).toContain('Error');
      done();
    });
  });

  describe('POST /', () => {
    it('should return a 201', async done => {
      mockedShortURLService.setDefaultId('someUniqShortURL');

      const response = await server.inject({
        method: 'POST',
        url: '/api/shorturls',
        payload: { redirectURL: 'http://domain.tld' },
        headers: {
          origin: 'http://shortnr',
        },
      });

      expect(response.statusCode).toEqual(201);
      expect(response.headers['location-id']).toEqual(
        'https://shortnr.test/someUniqShortURL'
      );
      done();
    });

    it('should return a 422', async done => {
      const response = await server.inject({
        method: 'POST',
        url: '/api/shorturls',
        payload: { redirectURL: 'poiuyt' },
      });

      expect(response.statusCode).toEqual(422);
      done();
    });

    it('should return a 500', async done => {
      mockedShortURLService.activateThrowErrorMode();

      const response = await server.inject({
        method: 'POST',
        url: '/api/shorturls',
        payload: { redirectURL: 'website.com' },
      });

      expect(response.statusCode).toEqual(500);

      const parsedPayload = JSON.parse(response.payload);
      expect(parsedPayload).toHaveProperty('message');
      expect(parsedPayload.message).toContain('Error');
      done();
    });
  });
});
