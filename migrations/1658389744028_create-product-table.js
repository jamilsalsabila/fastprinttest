/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable(
        'product',
        {
            id_produk: {
                type: 'VARCHAR(30)',
                primaryKey: true,
                unique: true,
                notNull: true,
            },
            nama_produk: {
                type: 'VARCHAR(200)',
                notNull: true,
            },
            harga: {
                type: 'INT',
                notNull: true,
            },
            kategori: {
                type: 'VARCHAR(100)',
                notNull: true,
            },
            status: {
                type: 'VARCHAR(50)',
                notNull: true,
            },
        },
    );
};

exports.down = pgm => {
    pgm.dropTable(
        'product',
        {
            ifExists: true,
            cascade: true,
        }
    );
};
