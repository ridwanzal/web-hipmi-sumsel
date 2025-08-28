const express = require('express');
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const [umrohList] = await promisePool.query('SELECT * FROM umroh ORDER BY created_at DESC');

      res.render('pages/umroh-list2', {
         title: 'Beranda - HIPMI Sumsel',
         type: 'website',
         canonical: 'https://payungmadinah.id/',
         author: 'HIPMI Sumsel',
         description: 'Wujudkan impian Umroh Anda bersama HIPMI Sumsel...',
         keywords: 'Umroh Plus, HIPMI Sumsel, Travel Umroh Terpercaya',
         breadcrumbs: [
            { name: 'Home', link: '/' }
         ],
         umrohList,
      });

   } catch (err) {
      console.error('Query error:', err);
      res.status(500).send('Database error');
   }
});

router.get('/list', function (req, res) {
   const filter = req.query.filter;
   res.render('pages/umroh-list', {
      title: 'Daftar Paket Umroh - HIPMI Sumsel',
      type: "article",
      canonical: 'https://payungmadinah.id/umroh',
      author: 'HIPMI Sumsel',
      description: 'Himpunan Pengusaha Muda Indonesia Sumatera Selatan Wujudkan Impian Umroh dengan fasilitas terbaik, berkelas, terjangkau, nyaman dan terpercaya.',
      keywords: 'Wujudkan impian Umroh Anda bersama HIPMI Sumsel. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
      breadcrumbs: [
         { name: 'Home', link: '/' },
         { name: 'Umroh', link: '/umroh' }
      ],
      umrohList: umrohList
   });
});

router.get('/:slug', function (req, res) {
   const slug = req.params.slug;

   connection.query('SELECT * FROM umroh WHERE slug = ?', [slug], function (err, results) {
      if (err) throw err;
      if (!results.length) return res.status(404).render('404');

      const umrohData = results[0];

      // Ambil gallery images untuk umroh ini
      connection.query('SELECT * FROM umroh_images WHERE umroh_id = ?', [umrohData.id], function (err, images) {
         if (err) throw err;

         // Ambil 5 umroh lainnya
         connection.query('SELECT * FROM umroh WHERE slug != ? ORDER BY created_at DESC LIMIT 5', [slug], function (err, otherResults) {
            if (err) throw err;

            // Ambil umroh terakhir
            connection.query('SELECT * FROM umroh ORDER BY id DESC LIMIT 1', function (err, lastArticle) {
               if (err) throw err;

               res.render('pages/umroh-detail', {
                  umroh: umrohData,          // data umroh utama
                  umroh_images: images,      // semua gambar galeri
                  umroh_other: otherResults, // list umroh lainnya
                  umroh_last: lastArticle    // umroh terakhir
               });
            });
         });
      });
   });
});


module.exports = router;
