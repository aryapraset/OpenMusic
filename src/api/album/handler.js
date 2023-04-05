/* eslint-disable require-jsdoc */
const autoBind = require('auto-bind');

class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }
  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const {name, year} = request.payload;
    const albumId = await this._service.addAlbum({name, year});

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {albumId},
    });
    console.log(response.message);
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
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
    this._validator.validateAlbumPayload(request.payload);
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
}

module.exports = AlbumHandler;