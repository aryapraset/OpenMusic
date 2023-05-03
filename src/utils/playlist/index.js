const mapDBToModelPlaylist = ({
  id,
  name,
  owner,
}) => ({
  id,
  name,
  username: owner,
});

const mapDBToModelPlaylistSongs = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

module.exports = {
  mapDBToModelPlaylist, mapDBToModelPlaylistSongs,
};
