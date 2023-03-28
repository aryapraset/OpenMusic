/* eslint-disable linebreak-style */
const Joi = require('joi');

const OpenMusicPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
  title: Joi.string().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duratiron: Joi.number(),
});

module.exports = {OpenMusicPayloadSchema};
