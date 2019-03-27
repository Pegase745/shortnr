import * as config from 'config';
import * as fastify from 'fastify';
import * as fs from 'fs';
import * as path from 'path';

import fastifyConfig from './config';
import shortURLRoutes from './controllers/shortURL';
import statusRoutes from './controllers/status';
import dbPlugin from './db';

const isProduction = process.env.NODE_ENV === 'production';

export const serverOptions = {
  logger: {
    level: 'error',
    prettyPrint: true,
  },
  bodyLimit: 5 * 1048576,
};

export const server = fastify(serverOptions);

export async function bootstrap() {
  // tslint:disable-next-line:no-var-requires
  server.register(require('fastify-no-icon'));
  // tslint:disable-next-line:no-var-requires
  server.register(require('fastify-helmet'));

  server.register(fastifyConfig, config);
  server.register(dbPlugin).ready();
  server.register(statusRoutes);
  server.register(shortURLRoutes);

  if (!isProduction) {
    // tslint:disable-next-line:no-var-requires
    server.register(require('fastify-blipp'));
  }

  if (isProduction) {
    // tslint:disable-next-line:no-var-requires
    server.use(require('serve-static')(path.join(__dirname, '../public')));

    server.get('/*', (req, reply) => {
      const stream = fs.createReadStream(
        path.join(__dirname, '../public', 'index.html')
      );
      reply
        .code(200)
        .type('text/html')
        .send(stream);
    });
  }

  const host = config.get('server.host') as string;
  const port = config.get('server.port') as number;

  try {
    await server.listen(port, host);

    if (!isProduction) {
      server.blipp();
    }

    // tslint:disable-next-line:no-console
    console.log(`Server listening on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  // tslint:disable-next-line:no-console
  console.log('Stopping server');

  await server.close(() => {
    // tslint:disable-next-line:no-console
    console.log('Server successfully stopped');
    process.exit(0);
  });
});
