const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');
const router = express.Router();
const blogsData = require('../public/json/blogsData');

router.get('/', function (req, res) {
   res.render('pages/agenresmi', {
      title: 'Jadi Agen Resmi - HIPMI Sumsel',
      type: "article",
      canonical: 'https://payungmadinah.id/agen-resmi',
      author: 'HIPMI Sumsel',
      type: "article",
      description: 'Himpunan Pengusaha Muda Indonesia Sumatera Selatan, Umroh Al Ula, Dubai, Turki, Thaif',
      keywords: 'Wujudkan impian Umroh Anda bersama HIPMI Sumsel. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
      breadcrumbs: [
         { name: 'Home', link: '/' },
         { name: 'Agen Resmi HIPMI Sumsel', link: '/agen-resmi' }
      ],
      blogs: blogsData.slice().reverse(),
   });
});

module.exports = router;
