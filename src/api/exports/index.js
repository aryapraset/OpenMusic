/* eslint-disable max-len */
const ExportsHandler = require('./handler');
const routes = require('./route');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, {service, playlistService, validator}) => {
    const exportsHandler = new ExportsHandler(service, playlistService, validator);
    server.route(routes(exportsHandler));
  },
};
