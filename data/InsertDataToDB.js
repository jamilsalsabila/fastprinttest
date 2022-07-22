require('dotenv').config();

const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

(async () => {
    const client = await pool.connect();
    const product = fs.readFileSync("data/product.json");
    const { data } = JSON.parse(product);

    for (let i = 0; i < data.length; i++) {
        try {
            const {
                id_produk,
                nama_produk,
                harga,
                kategori,
                status,
            } = data[i];
            const res = await client.query('INSERT INTO product VALUES ($1, $2, $3, $4, $5) RETURNING id_produk', [id_produk, nama_produk, harga, kategori, status]);
            console.log(res.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    }
    await client.end();
})().catch(err => console.log(err.stack));