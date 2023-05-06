/* eslint-disable max-len */
const PlaylistSongsHandler = require('./handler');
const routes = require('./route');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, {
    playlistSongService, songService, playlistService, validator,
  }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(playlistSongService, songService, playlistService, validator);
    server.route(routes(playlistSongsHandler));
  },
};
