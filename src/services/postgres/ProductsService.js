const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../../../exceptions/NotFoundError');

class ProductsService {
    constructor() {
        this._pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });

    }

    async postProduct(payload) {
        const {
            nama_produk,
            harga,
            kategori,
            status,
        } = payload;
        const id = `${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO product VALUES ($1, $2, $3, $4, $5) RETURNING id_produk',
            values: [id, nama_produk, harga, kategori, status],
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new Error("Gagal menambahkan produk :(");
        }

        return result.rows[0].id_produk;
    }

    async getProducts() {
        const query = {
            text: 'SELECT * FROM product;',
            values: [],
        };
        const result = await this._pool.query(query);

        return result.rows;
    }
    async getProductById(id) {
        const query = {
            text: 'SELECT * FROM product WHERE id_produk = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("Gagal mendapatkan produk. Id tidak ditemukan", 404);
        }

        return result.rows[0];
    }
    async putProductById(id, payload) {
        const {
            nama_produk,
            harga,
            kategori,
            status,
        } = payload;
        const query = {
            text: 'UPDATE product SET nama_produk = $1, harga = $2, kategori = $3, status = $4 WHERE id_produk = $5 RETURNING id_produk',
            values: [nama_produk, harga, kategori, status, id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new Error("Gagal meng-update produk");
        }
    }
    async deleteProductById(id) {
        const query = {
            text: 'DELETE FROM product WHERE id_produk = $1 RETURNING id_produk',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new Error("Gagal menghapus produk");
        }
    }
}

module.exports = ProductsService;