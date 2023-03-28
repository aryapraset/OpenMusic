/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
const {nanoid}=require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class OpenMusicService {
  constructor() {
    this._album = [];
    this._songs = [];
  }

  addAlbum({name, year}) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

    const newAlbum = {
      id, name, year, insertedAt, updateAt,
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
      throw new NotFoundError('Album tidak ditemukan');
    }
    return album;
  }

  editAlbumById(id, {name, year}) {
    const index = this._album.findIndex((album)=>album.id===id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
    const updateAt = new Date().toISOString();
    this._album[index]={
      ...this._album[index],
      name,
      year,
      updateAt,
    };
  }

  deleteAlbumById(id) {
    const index = this._album.findIndex((album)=>album.id===id);
    if (index === -1) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
    this._album.splice(index, 1);
  }

  addSong({title, year, genre, performer, duration}) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

    const newSong = {
      title, year, genre, performer, duration, id, insertedAt, updateAt,
    };

    this._songs.push(newSong);
    const isSuccess = this._songs.filter((song)=>song.id===id).length>0;
    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }
    return id;
  }

  getAllSongs() {
    let songList = [...this._songs];
    if (songList.length) {
      songList = songList.map((song) => ({
        id: song.id,
        title: song.title,
        performer: song.performer,
      }));
    }
    return [...songList];
  }

  getSongById(id) {
    const index = this._songs.filter((song)=>song.id === id)[0];
    if (!index) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return index;
  }

  editSongById(id, {title, year, genre, performer, duration}) {
    const index = this._songs.findIndex((song)=>song.id===id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagi. Id tidak ditemukan');
    }
    const updateAt = new Date().toISOString();
    this._songs[index]={
      ...this._songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      updateAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song)=>song.id===id);
    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
    this._songs.splice(index, 1);
  }
}

module.exports = OpenMusicService;
