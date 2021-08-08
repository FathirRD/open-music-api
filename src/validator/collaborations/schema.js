const Joi = require('joi');

const CollabrionPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { CollabrionPayloadSchema };
