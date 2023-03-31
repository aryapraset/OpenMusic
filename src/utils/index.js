/* eslint-disable camelcase */
const mapDBToModelAlbum = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year,
});

const mapDBToModelSong = ({
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

module.exports = {mapDBToModelAlbum, mapDBToModelSong};
