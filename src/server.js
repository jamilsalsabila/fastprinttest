require('dotenv').config();

// EKSTERNAL LIBRARY
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const Path = require('path');


// API
const products = require('./api/products');

// SERVICES
const ProductsService = require('./services/postgres/ProductsService');

// VALIDATOR
const ProductsValidator = require('./validator/products');

const init = async () => {
    const productsService = new ProductsService();

    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // registrasi plugin eksternal
    await server.register([
        {
            plugin: Vision
        },
        {
            plugin: Inert,
        }
    ]);

    // routes
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return h.file('halaman_utama.html');
            },
            options: {
                files: {
                    relativeTo: Path.join(__dirname, 'static'),
                },
            },
        },
        {
            method: 'GET',
            path: '/edit',
            handler: (request, h) => {
                return h.file('edit_produk.html');
            },
            options: {
                files: {
                    relativeTo: Path.join(__dirname, 'static'),
                },
            },
        },
        {
            method: 'POST',
            path: '/detail',
            handler: (request, h) => {
                const { id_produk } = request.payload;
                return h.redirect(`/products/${id_produk}`);
            },
        },
        {
            method: 'GET',
            path: '/hapus',
            handler: (request, h) => {
                return h.file('hapus_produk.html');
            },
            options: {
                files: {
                    relativeTo: Path.join(__dirname, 'static'),
                },
            },
        },
        {
            method: 'GET',
            path: '/tambah',
            handler: (request, h) => {
                return h.file('tambah_produk.html');
            },
            options: {
                files: {
                    relativeTo: Path.join(__dirname, 'static'),
                },
            },
        },
        {
            method: 'POST',
            path: '/hapus',
            handler: (request, h) => {
                const { id_produk } = request.payload;
                return h.redirect(`/products/${id_produk}?hapus=true`);
            },
        },

    ]);

    let context = {
        title: 'Table Produk',
    };
    server.views({
        engines: {
            html: require('handlebars'),
        },
        relativeTo: __dirname,
        path: './templates',
        layoutPath: './templates/layout',
        helpersPath: './templates/helpers',
        layout: true,
        isCached: false, // in production mode set to true,
        context,
    });

    // registrasi plugin internal
    await server.register([
        {
            plugin: products,
            options: {
                service: productsService,
                validator: ProductsValidator,
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();