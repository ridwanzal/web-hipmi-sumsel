const express = require('express');
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const router = express.Router();

router.get('/', function (req, res) {
   res.render('pages/social-media', {
      title: 'Tim Kami - HIPMI Sumsel',
      type: "article",
      canonical: 'https://payungmadinah.id/sosial-media',
      author: 'HIPMI Sumsel',
      type: "article",
      description: 'Sosial Media - HIPMI Sumsel',
      keywords: 'Wujudkan impian Umroh Anda bersama HIPMI Sumsel. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
      breadcrumbs: [
         { name: 'Home', link: '/' },
         { name: 'Sosial Media', link: '/sosial-media' }
      ],
   });
});

module.exports = router;
