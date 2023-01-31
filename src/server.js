/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const musics = require('./api/musics');
const MusicsService = require('./services/inMemory/MusicsService');
const MusicsValidator = require('./validator/musics');

const init = async () => {
  const musicsService = new MusicsService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: musics,
    options: {
      service: musicsService,
      validator: MusicsValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
