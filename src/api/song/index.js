const SongHandler = require('./handler');
const routes = require('../song/route');

module.exports = {
  name: 'song',
  version: '1.0.0',
  register: async (server, {service, validator}) => {
    const songHandler = new SongHandler(service, validator);
    server.route(routes(songHandler));
  },
};
