/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const autoBind = require('auto-bind');
const AuthorizationError = require('../../exception/AuthorizationError');

class PlaylistsHandler {
  constructor(playlistService, songService, validator) {
    this._playlistService = playlistService;
    this._songService = songService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistsPayload(request.payload);

    const {name} = request.payload;
    const {id: credentialId} = request.auth.credentials;

    const playlistId = await this._playlistService.addPlaylist(name, credentialId);

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getUserPlaylistHandler(request) {
    const {id: credentialId} = request.auth.credentials;

    const playlists = await this._playlistService.getUserPlaylist(credentialId);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deleteUserPlaylistHandler(request) {
    this._validator.validatePlaylistsPayload(request.payload);

    const {id} = request.params;
    const {id: credentialId} = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(id, credentialId);
    await this._playlistService.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  async postSongIntoPlaylistHandler(request, h) {
    this._validator.validateSongOnPlaylistPayload(request.payload);

    const {id: playlistId} = request.params;
    const {songId} = request.payload;
    const {id} = request.auth.credentials;

    await this._playlistService.addSongOnPlaylist(songId);
    const owner = await this._playlistService.getOwnerPlaylistById(playlistId);
    if (owner !== id) {
      throw new AuthorizationError('Anda tidak berhak menambahkan playlist');
    }

    const playlistSongId = await this._playlistService.addSongOnPlaylist(playlistId, songId);

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
      data: {
        playlistSongId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongOnPlaylistHandler(request) {
    const {id: playlistId} = request.params;
    const {id: credentialId} = request.auth.credentials;

    await this._service.verifyPlaylistOwner(playlistId, credentialId);
    const playlist = await this._playlistService.getPlaylistById(credentialId, playlistId);
    const song = await this._songService.getSongsByPlaylistId;
    playlist.song = song;

    return {
      status: 'success',
      data: {
        playlist: playlist,
      },
    };
  }
  async deleteSongFromPlaylistHandler(request) {
    this._validator.validateSongOnPlaylistPayload(request.payload);

    const {songId} = request.payload;
    const {id: playlistId} = request.params;
    const {id} = request.auth.credentials;

    await this._songService.getSongById(songId);
    const owner = await this._playlistService.getOwnerPlaylistById(playlistId);
    if (owner !== id) {
      throw new AuthorizationError('Anda tidak berhak menghapus lagu di playlist');
    }

    await this._playlistService.deleteSongOnPlaylist(songId);
    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistsHandler;
