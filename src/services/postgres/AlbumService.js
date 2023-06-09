/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const {Pool} = require('pg');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const {nanoid} = require('nanoid');

class AlbumService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }
  async addAlbum({name, year}) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO album VALUES($1,$2,$3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    await this._cacheService.delete(`album:${id}`);
    return result.rows[0].id;
  }
  async getAlbumById(id) {
    try {
      const result = await this._cacheService.get(`album:${id}`);
      return {
        result: JSON.parse(result),
        cached: true,
      };
    } catch (error) {
      const query = {
        text: `SELECT album.id as "album_id", album.year as "album_year", album.name as"album_name", album.cover, songs.id, songs.title, songs.performer
        FROM songs RIGHT JOIN album ON songs.albumid = album.id
        WHERE album.id = $1`,
        values: [id],
      };
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Album tidak ditemukan');
      }
      await this._cacheService.set(`album:${id}`, JSON.stringify(result));

      return {
        result,
        cached: false,
      };
    }
  }
  async editAlbumById(id, {name, year}) {
    const query = {
      text: 'UPDATE album SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }

    await this._cacheService.delete(`album:${id}`);
  }
  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM album WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus, Id tidak ditemukan');
    }
    await this._cacheService.delete(`album:${id}`);
  }
}

module.exports = AlbumService;
