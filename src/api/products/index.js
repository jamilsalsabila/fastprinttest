const routes = require('./routes');
const ProductsHandler = require('./handler');

module.exports = {
    name: 'products',
    version: '1.0.0',
    register: async (server, options) => {
        const productsHandler = new ProductsHandler(options.service, options.validator);
        server.route(routes(productsHandler));
    }
}