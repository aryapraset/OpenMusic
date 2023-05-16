/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const {nanoid} = require('nanoid');
const {Pool} = require('pg');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const ClientError = require('../../exception/ClientError');

class AlbumLikesService {
  constructor(albumService) {
    this._pool = new Pool;
    this._albumService = albumService;
  }

  async addLikesToAlbum(albumId, userId) {
    const id = `like-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menyukai album');
    }

    return result.rows[0].id;
  }

  async getAlbumLikes(albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return {
      likes: result.rowCount,
    };
  }

  async deleteLike(albumId, userId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE album_id = $1 AND user_id = $2',
      values: [albumId, userId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Like gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyUserLiked(albumId, userId) {
    await this._albumService.getAlbumById(albumId);
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE album_id = $1 AND user_id = $2',
      values: [albumId, userId],
    };
    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new ClientError('Anda sudah menyukai album ini');
    }
  }
}

module.exports = AlbumLikesService;
