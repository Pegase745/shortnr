import { IConfig } from 'config';
import { Redis } from 'ioredis';
import * as fastify from 'fastify';
import * as https from 'http';
import * as http from 'http';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = https.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    config: IConfig;
    redis: Redis;
    blipp(): void;
  }
}
