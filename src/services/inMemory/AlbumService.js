/* eslint-disable require-jsdoc */
const {nanoid}=require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class AlbumService {
  constructor() {
    this._album = [];
  }
  addAlbum({name, year}) {
    const id = nanoid(16);

    const newAlbum = {
      id, name, year,
    };

    this._album.push(newAlbum);

    const isSuccess = this._album.filter((album)=>album.id===id).length>0;

    if (!isSuccess) {
      throw new InvariantError('Album gagal ditambahkan');
    }
    return id;
  }

  getAlbumById(id) {
    const album = this._album.filter((n)=>n.id===id)[0];
    if (!album) {
      console.log();
      throw new NotFoundError('Album tidak ditemukan');
    }
    return album;
  }

  editAlbumById(id, {name, year}) {
    const index = this._album.findIndex((album)=>album.id===id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }

    this._album[index]={
      ...this._album[index],
      name,
      year,
    };
  }

  deleteAlbumById(id) {
    const index = this._album.findIndex((album)=>album.id===id);
    if (index === -1) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
    this._album.splice(index, 1);
  }
}

module.exports = AlbumService;
