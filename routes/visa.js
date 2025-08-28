const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const router = express.Router();
const blogsData = require('../public/json/blogsData');

router.get('/', function (req, res) {
   res.render('pages/visa', {
      title: 'Apply Visa - HIPMI Sumsel',
      type: "article",
      canonical: 'https://payungmadinah.id/visa',
      author: 'HIPMI Sumsel',
      type: "article",
      description: 'Himpunan Pengusaha Muda Indonesia Sumatera Selatan Wujudkan Impian Umroh dengan fasilitas terbaik, berkelas, terjangkau, nyaman dan terpercaya.',
      keywords: 'Wujudkan impian Umroh Anda bersama HIPMI Sumsel. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
      breadcrumbs: [
         { name: 'Home', link: '/' },
         { name: 'Apply Visa', link: '/visa' }
      ],
      blogs: blogsData.slice().reverse(),
   });
});

module.exports = router;
