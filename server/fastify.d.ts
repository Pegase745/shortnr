import { IConfig } from 'config';
import * as fastify from 'fastify';
import * as http from 'http';
import { Connection } from 'typeorm';

declare module 'fastify' {
  // tslint:disable-next-line:interface-name
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    config: IConfig;
    db: Connection;
    blipp(): void;
  }
}
