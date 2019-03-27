import * as fp from 'fastify-plugin';
import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';

export default fp(async (server, opts) => {
  try {
    const connectionOptions = Object.assign(await getConnectionOptions(), {
      host: server.config.get('db.host') as string,
      port: server.config.get('db.port') as number,
      username: server.config.get('db.username') as string,
      password: server.config.get('db.password') as string,
      logging: server.config.get('db.logging') as boolean,
    });
    const connection = await createConnection(connectionOptions);

    server.log.info('Running migrations...');
    await connection.runMigrations();

    server.decorate('db', connection);
  } catch (err) {
    server.log.error(err);
  }
});
