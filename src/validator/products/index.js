const productPayloadSchema = require('./schema');
const InvariantError = require('../../../exceptions/InvariantError');

const ProductsValidator = {
    validateProductPayload: (payload) => {
        const validationResult = productPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = ProductsValidator;