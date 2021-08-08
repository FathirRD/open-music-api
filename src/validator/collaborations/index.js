const InvariantError = require('../../exceptions/InvariantError');
const { CollabrionPayloadSchema } = require('./schema');

const CollaborationPayload = {
  validateCollaborationPayload: (payload) => {
    const validationResult = CollabrionPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CollaborationPayload;
