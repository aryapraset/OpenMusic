/* eslint-disable require-jsdoc */
const autoBind = require('auto-bind');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }
  async postSongHandler({payload}, h) {
    this._validator.validateSongPayload(payload);
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

  async getSongByIdHandler(request, h) {
    const {id} = request.params;

    const song = await this._service.getSongById(id);

    const response = h.response({
      status: 'success',
      data: {song},
    });
    console.log(response.message);
    response.code(200);
    return response;
  }

  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);
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

module.exports = SongHandler;
