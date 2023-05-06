/* eslint-disable require-jsdoc */
const {nanoid} = require('nanoid');
const {Pool} = require('pg');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class PlaylistSongService {
  constructor() {
    this._pool = new Pool();
  }
  async addPlaylistSong(playlistId, songId) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO playlistsongs VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal ditambahkan ke dalam playlist');
    }
    return result.rows[0].id;
  };

  async deletePlaylistSong(songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE song_id = $1 RETURNING id',
      values: [songId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = PlaylistSongService;
