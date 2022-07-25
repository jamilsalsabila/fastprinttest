require('dotenv').config();

// EKSTERNAL LIBRARY
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');

// API
const products = require('./api/products');
const static = require('./api/static');

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
        {
            plugin: static,
            options: {},
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();