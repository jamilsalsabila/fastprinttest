const Joi = require('joi');

const productPayloadSchema = Joi.object({
    nama_produk: Joi.string().required(),
    harga: Joi.number().required(),
    kategori: Joi.string().required(),
    status: Joi.string().required(),
});

module.exports = productPayloadSchema;