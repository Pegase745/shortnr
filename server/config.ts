import { IConfig } from 'config';
import * as fp from 'fastify-plugin';

export default fp(async (server, opts: IConfig, next) => {
  server.decorate('config', opts);

  next();
});
