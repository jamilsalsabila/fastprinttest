1. clone kodenya:
    https://github.com/jamilsalsabila/fastprinttest.git

2. masuk ke direktori

3. npm install 

4. projek ini menggunakan postgresql, framework hapi.js, node.js. Install dulu jika belum ada, terutama postgresql

5  jalankan:
    npm run migrate up

6. masuk ke folder data

7. jalankan:
    node InsertDataToDB.js // untuk memasukkan data ke postgres

8. jalankan:
    npm run start // untuk menjalankan server

9. masuk ke halaman utama:
    http://localhost:8080/

10. disitu bisa pilih:
    - lihat produk
    - edit produk
    - hapus produk
    - tambah produk

