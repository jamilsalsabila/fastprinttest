class StaticFileHandler {
    constructor() {
        this.getHalamanUtamaHandler = this.getHalamanUtamaHandler.bind(this);
        this.getEditProdukHandler = this.getEditProdukHandler.bind(this);
        this.postDetailHandler = this.postDetailHandler.bind(this);
        this.getHapusProdukHandler = this.getHapusProdukHandler.bind(this);
        this.getTambahProdukHandler = this.getTambahProdukHandler.bind(this);
        this.postHapusHandler = this.postHapusHandler.bind(this);
    }

    async getStyleCSSHandler(require, h) {
        return h.file('style.css');
    }

    async getHalamanUtamaHandler(request, h) {
        return h.file('halaman_utama.html');
    }

    async getEditProdukHandler(request, h) {
        return h.file('edit_produk.html');
    }

    async postDetailHandler(request, h) {
        const { id_produk } = request.payload;
        return h.redirect(`/products/${id_produk}`);
    }

    async getHapusProdukHandler(request, h) {
        return h.file('hapus_produk.html');
    }

    async getTambahProdukHandler(request, h) {
        return h.file('tambah_produk.html');
    }

    async postHapusHandler(request, h) {
        const { id_produk } = request.payload;
        return h.redirect(`/products/${id_produk}?hapus=true`);
    }
}

module.exports = StaticFileHandler;