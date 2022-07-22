const routes = (handler) => [
    {
        method: 'GET',
        path: '/products',
        handler: handler.getProductsHandler,
    },
    {
        method: 'GET',
        path: '/products/{id}',
        handler: handler.getProductByIdHandler,
    },
    {
        method: 'POST',
        path: '/products',
        handler: handler.postProductHandler,
    },
    {
        method: 'POST',
        path: '/products/{id}',
        handler: handler.postProductByIdHandler,
    },
    {
        method: 'PUT',
        path: '/products/{id}',
        handler: handler.putProductByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/products/{id}',
        handler: handler.deleteProductByIdHandler,
    },
];

module.exports = routes;
