const ClientError = require('../../../exceptions/ClientError');

class ProductsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postProductHandler = this.postProductHandler.bind(this);
        this.getProductsHandler = this.getProductsHandler.bind(this);
        this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
        this.putProductByIdHandler = this.putProductByIdHandler.bind(this);
        this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
        this.postProductByIdHandler = this.postProductByIdHandler.bind(this);
    }

    async postProductHandler(request, h) {
        try {
            this._validator.validateProductPayload(request.payload);
            const id = await this._service.postProduct(request.payload);
            const response = h.response({
                status: 'success',
                data: {
                    id,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.status);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: error.message,
            });
            response.code(500)
            return response;
        }
    }

    async getProductsHandler(request, h) {
        const data = await this._service.getProducts();
        // const response = h.response({
        //     status: 'success',
        //     data: data,
        // });
        // response.code(202);
        // return response;

        return h.view('lihat_produk', { data: data });
    }

    async getProductByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const { hapus } = request.query;

            const data = await this._service.getProductById(id);

            if (hapus) {
                return h.view('detail_hapus_produk', { data: data });
            }

            // const response = h.response({
            //     status: 'success',
            //     data: data,
            // });
            // response.code(202);
            return h.view('detail_produk', { data: data });
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.status);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: error.message,
            });
            response.code(500)
            return response;
        }
    }

    async putProductByIdHandler(request, h) {
        try {
            this._validator.validateProductPayload(request.payload);
            const { id } = request.params;

            await this._service.putProductById(id, request.payload);

            const response = h.response({
                status: 'success',
                message: 'Data produk berhasil di-update',
            });
            response.code(200);
            return h.redirect('/products');
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.status);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: error.message,
            });
            response.code(500)
            return response;
        }
    }

    async deleteProductByIdHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteProductById(id);

            const response = h.response({
                status: 'success',
                message: 'Produk berhasil dihapus',
            });
            response.code(200)
            return h.redirect('/products');

        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.status);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: error.message,
            });
            response.code(500)
            return response;
        }
    }

    async postProductByIdHandler(request, h) {
        if (request.payload.hapus === 'ya') {
            return this.deleteProductByIdHandler(request, h);
        } else if (request.payload.hapus === 'tidak') {
            return h.redirect("/");
        }
        // return this.putProductByIdHandler(request, h);
    }

}

module.exports = ProductsHandler;