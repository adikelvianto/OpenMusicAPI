/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class AlbumLikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;

    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.getAlbumLikeHandler = this.getAlbumLikeHandler.bind(this);
  }

  async postAlbumLikeHandler(request, h) {
    try {
      const { id: albumId } = request.params;
      const { id: userId } = request.auth.credentials;

      await this._albumsService.getAlbumById(albumId);
      await this._service.addLikeUnlike(userId, albumId);

      const response = h.response({
        status: 'success',
        message: 'Berhasil menyukai album',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }

  async getAlbumLikeHandler(request, h) {
    try {
      const { id: albumId } = request.params;
      const { likes, isCache = 0 } = await this._service.getLikeAlbum(albumId);

      const response = h.response({
        status: 'success',
        data: {
          likes: likes.length,
        },
      });
      response.code(200);

      if (isCache) response.header('X-Data-Source', 'cache');

      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = AlbumLikesHandler;
