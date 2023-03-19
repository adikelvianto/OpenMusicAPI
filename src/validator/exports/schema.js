const joi = require('joi');

const ExportPlaylistSongsPayloadSchema = joi.object({
  targetEmail: joi.string().email({ tlds: true }).required(),
});

module.exports = ExportPlaylistSongsPayloadSchema;
