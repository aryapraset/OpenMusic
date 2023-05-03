const {
  PlaylistPayloadSchema,
  SongOnPlaylistPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const PlaylistsValidator = {
  validatePlaylistsPayload: (payload) => {
    const validationResult = PlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateSongOnPlaylistPayload: (payload)=>{
    const validationResult = SongOnPlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsValidator;
