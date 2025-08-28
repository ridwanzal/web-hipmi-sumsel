const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res, next) {
   res.render('pages/linkpage', {
      title: 'Linktree - HIPMI Sumsel',
      type: "website",
      author: 'HIPMI Sumsel',
      canonical: 'https://payungmadinah.id/pages/linkpage',
      description: 'Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel',
      keywords: 'Himpunan Pengusaha Muda Indonesia Sumatera Selatan Wujudkan Impian Umroh dengan fasilitas terbaik, berkelas, terjangkau, nyaman dan terpercaya.',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Link Page',
         }
      ]
   });
});

module.exports = router;