/* eslint-disable linebreak-style */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const OpenMusicService = require('./services/postgres/OpenMusicService');
const music = require('./api/music');
const ClientError = require('./exception/ClientError');
const Validator = require('./validator/music');

const init = async () => {
  const openMusicService = new OpenMusicService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
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
      validator: Validator,
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
