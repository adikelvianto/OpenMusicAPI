/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  // add album
  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan!');
    }

    return result.rows[0].id;
  }

  // get album by id
  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return result.rows[0];
  }

  // edit album by id
  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  // delete album by id
  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }

  // Get song inside album service
  async getSongsInAlbum(id) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE "album_id" = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async addAlbumCover(id, fileUrl) {
    const query = {
      text: 'UPDATE albums SET "coverUrl" = $1 WHERE id = $2 RETURNING id',
      values: [fileUrl, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
