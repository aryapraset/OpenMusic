/* eslint-disable linebreak-style */
const InvariantError = require('../../exception/InvariantError');
const {OpenMusicPayloadSchema} = require('./schema');

const OpenMusicValidator = {
  validateOpenMusicPayload: (payload)=>{
    const validationResult = OpenMusicPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = OpenMusicValidator;
