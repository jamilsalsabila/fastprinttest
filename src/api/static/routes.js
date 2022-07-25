const Path = require('path');

const routes = (handler) => [
    {
        method: 'GET',
        path: '/static/css/style.css',
        handler: handler.getStyleCSSHandler,
        options: {
            files: {
                relativeTo: Path.join(__dirname, '../../static/css'),
            },
        },
    },
    {
        method: 'GET',
        path: '/',
        handler: handler.getHalamanUtamaHandler,
        options: {
            files: {
                relativeTo: Path.join(__dirname, '../../static/html'),
            },
        },
    },
    {
        method: 'GET',
        path: '/edit',
        handler: handler.getEditProdukHandler,
        options: {
            files: {
                relativeTo: Path.join(__dirname, '../../static/html'),
            },
        },
    },
    {
        method: 'POST',
        path: '/detail',
        handler: handler.postDetailHandler,
    },
    {
        method: 'GET',
        path: '/hapus',
        handler: handler.getHapusProdukHandler,
        options: {
            files: {
                relativeTo: Path.join(__dirname, '../../static/html'),
            },
        },
    },
    {
        method: 'GET',
        path: '/tambah',
        handler: handler.getTambahProdukHandler,
        options: {
            files: {
                relativeTo: Path.join(__dirname, '../../static/html'),
            },
        },
    },
    {
        method: 'POST',
        path: '/hapus',
        handler: handler.postHapusHandler,
    },

];

module.exports = routes;