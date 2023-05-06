/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const autoBind = require('auto-bind');
const AuthorizationError = require('../../exception/AuthorizationError');

class PlaylistSongsHandler {
  constructor(playlistSongService, songService, playlistService, validator) {
    this._playlistSongService = playlistSongService;
    this._songService = songService;
    this._playlistService = playlistService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const {id: playlistId} = request.params;
    const {songId} = request.payload;
    const {id} = request.auth.credentials;

    await this._songService.getSongById(songId);
    const owner = await this._playlistService.getOwnerPlaylistById(playlistId);

    if (owner !== id) {
      throw new AuthorizationError('Anda tidak berhak menambahkan playlist');
    }

    const playlistSongId = await this._playlistSongService.addPlaylistSong(playlistId, songId);

    const response = h.response({
      status: 'success',
      message: 'berhasil menambahkan lagu ke dalam playlist',
      data: {
        playlistSongId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongHandler(request) {
    const {id: playlistId} = request.params;
    const {id: owner} = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(playlistId, owner);

    const playlists = await this._playlistService.getPlaylistById(owner, playlistId);
    const songs = await this._songService.getSongsByPlaylistId(playlistId);
    playlists.songs = songs;

    return {
      status: 'success',
      data: {
        playlist: playlists,
      },
    };
  }

  async deletePlaylistSongHandler(request) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const {id: playlistId} = request.params;
    const {songId} = request.payload;
    const {id} = request.auth.credentials;

    await this._songService.getSongById(songId);
    const owner = await this._playlistService.getOwnerPlaylistById(playlistId);
    if (owner !== id) {
      throw new AuthorizationError('Anda tidak berhak menghapus lagu di playlist ini');
    }

    await this._playlistSongService.deletePlaylistSong(songId);
    return {
      status: 'success',
      message: 'Lagu pada playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistSongsHandler;
