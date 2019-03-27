import * as fastify from 'fastify';
import * as fp from 'fastify-plugin';
import * as http from 'http';
import {
  InternalServerError,
  NotFound,
  UnprocessableEntity,
} from 'http-errors';
import normalize from 'normalize-url';
import * as validator from 'validator';

import ShortURL from '../entities/ShortURL';
import ShortURLService from '../services/ShortURLService';

export default fp(async (server, opts, next) => {
  const db = server.db;
  const shortURLService = new ShortURLService(db.getRepository(ShortURL));

  /**
   * GET /api/shorturls/:shortURL
   * Retrieve a redirect url for a given short url.
   */
  const getShortURLOpts = {
    schema: {
      params: {
        type: 'object',
        properties: {
          shortURL: { type: 'string' },
        },
      },
    },
  };

  const getShortURLHandler = async (
    request: fastify.FastifyRequest<http.IncomingMessage>,
    reply: fastify.FastifyReply<http.ServerResponse>
  ) => {
    try {
      const shortURL = await shortURLService.findById(request.params.shortURL);

      if (!shortURL) {
        return new NotFound();
      }

      return reply
        .code(200)
        .header('Content-Type', 'application/json')
        .send({ redirectURL: shortURL.url });
    } catch (err) {
      request.log.error(err);
      return new InternalServerError(String(err));
    }
  };

  server.get('/api/shorturls/:shortURL', getShortURLOpts, getShortURLHandler);

  /**
   * POST /api/shorturls
   * Create a short URL for a given redirect url.
   */
  const createShortURLOpts = {
    schema: {
      body: {
        type: 'object',
        properties: {
          redirectURL: { type: 'string' },
        },
        required: ['redirectURL'],
      },
      response: {
        201: {
          type: 'null',
        },
      },
    },
  };

  const createShortURLHandler = async (
    request: fastify.FastifyRequest<http.IncomingMessage>,
    reply: fastify.FastifyReply<http.ServerResponse>
  ) => {
    try {
      const redirectURL = request.body.redirectURL;
      const formattedRedirectURL = normalize(redirectURL);

      if (!validator.isURL(formattedRedirectURL)) {
        return new UnprocessableEntity(
          `${formattedRedirectURL} is not a valid URL`
        );
      }

      const existingShortURL = await shortURLService.findByURL(
        formattedRedirectURL
      );

      let headerUrl: string;

      if (!existingShortURL) {
        const shortURL = await shortURLService.create(formattedRedirectURL);
        headerUrl = shortURL.id;
      } else {
        headerUrl = existingShortURL.id;
      }

      return reply
        .code(201)
        .header('Location-Id', `${server.config.get('hostname')}/${headerUrl}`)
        .send();
    } catch (err) {
      request.log.error(err);
      return new InternalServerError(String(err));
    }
  };

  server.post('/api/shorturls', createShortURLOpts, createShortURLHandler);

  next();
});
