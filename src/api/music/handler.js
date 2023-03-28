/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
// const autoBind = require('auto-bind');

class OpenMusicHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateOpenMusicPayload(request.payload);
    const {name, year} = request.payload;
    const albumId = await this._service.addAlbum({name, year});

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {albumId},
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
    this._validator.validateOpenMusicPayload(request.payload);
    const {id} = request.params;
    const album = await this._service.getAlbumById(id);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditemukan',
      data: {album},
    });
    response.code(200);
    return response;
  }

  async putAlbumByIdHandler(request) {
    const {id} = request.params;
    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const {id} = request.params;
    await this._service.deleteAlbumById(id);
    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  }

  async postSongHandler({payload}, h) {
    this._validator.validateOpenMusicPayload(request.payload);
    const songId = await this._service.addSong(payload);
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {songId},
    });
    response.code(201);
    return response;
  }

  async getAllSongsHandler() {
    const songs = await this._service.getAllSongs();

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const {id} = request.params;

    const song = await this._service.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request) {
    this._validator.validateOpenMusicPayload(request.payload);
    const {id} = request.params;
    await this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request) {
    const {id} = request.params;

    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = OpenMusicHandler;
