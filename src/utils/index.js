/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
  playlist_id,
  song_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
  playlistId: playlist_id,
  songId: song_id,
});

module.exports = { mapDBToModel };
