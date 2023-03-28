/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const OpenMusicService = require('./services/inMemory/OpenMusicService');
const music = require('./api/music');
const ClientError = require('./exception/ClientError');
const OpenMusicValidator = require('./validator/music');

const init = async () => {
  const openMusicService = new OpenMusicService();

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
    plugin: music,
    options: {
      service: openMusicService,
      validator: OpenMusicValidator,
    },
  });

  server.ext('onPreResponse', (request, h)=>{
    const {response} = request;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      if (!response.isServer) {
        return h.continue;
      }
      const newResponse = h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
