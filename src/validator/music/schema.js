/* eslint-disable linebreak-style */
const Joi = require('joi');

const albumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});
const songPayloadSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duratiron: Joi.number(),
});

module.exports = {albumPayloadSchema, songPayloadSchema};
