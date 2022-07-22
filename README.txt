1. clone kodenya:
    https://github.com/jamilsalsabila/fastprinttest.git

2. masuk ke direktori

3. npm install 

4. projek ini menggunakan postgresql, framework hapi.js, node.js. Install dulu jika belum ada, terutama postgresql

4.a. waktu install postgres, tetapkan 'host':'localhost' dan 'port':5432

4.b. membuat predefined user 'salsabilajamil'
        1. login ke postgresql sebagai 'root'
                psql --username postgres -W
        2. buat user 'salsabilajamil'
                CREATE USER salsabilajamil WITH ENCRYPTED PASSWORD 'salsabilajamil' VALID UNTIL '2022-08-08';

4.c. membuat predefined database 'fastprinttest'
        CREATE DATABASE fastprinttest;

4.d. izinkan user 'salsabilajamil' untuk mengakses database 'fastprinttest'
        GRANT ALL PRIVILEGES ON DATABASE fastprinttest TO salsabilajamil;

4.e. [optional] jika ingin keluar sebagai root kemudian masuk sebagai user 'salsabilajamil'
        1. \q
        2. psql --username salsabilajamil --dbname fastprinttest

4.f. coba jalankan
        npm run migrate up // jalankan pada terminal, tujuannya adalah membuat tabel 'product' sesuai arahan soal

4.g. jika berhasil migrasinya, masuk ke folder data kemudian jalankan
        node InsertDataToDB.js // mengisi tabel 'product' dengan data yang telah di-unduh

5. jalankan:
    npm run start // untuk menjalankan server

6. masuk ke halaman utama:
    http://localhost:8080/

7. disitu bisa pilih:
    - lihat produk
    - edit produk
    - hapus produk
    - tambah produk

