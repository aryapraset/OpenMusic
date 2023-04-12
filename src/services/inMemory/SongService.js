/* eslint-disable require-jsdoc */
const {nanoid}=require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class SongService {
  constructor() {
    this._songs = [];
  }
  addSong({title, year, genre, performer, duration, albumId}) {
    const id = nanoid(16);

    const newSong = {
      title, year, genre, performer, duration, id, albumId,
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

  editSongById(id, {title, year, genre, performer, duration, albumId}) {
    const index = this._songs.findIndex((song)=>song.id===id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagi. Id tidak ditemukan');
    }

    this._songs[index]={
      ...this._songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
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

module.exports = SongService;
