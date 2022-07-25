const routes = require('./routes');
const StaticFileHandler = require('./handler');

module.exports = {
    name: 'static',
    version: '1.0.0',
    register: async (server, options) => {
        const staticFileHandler = new StaticFileHandler();
        server.route(routes(staticFileHandler));
    }
}