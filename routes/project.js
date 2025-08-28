const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res, next) {
   res.render('pages/project', {
      title: 'Project - HIPMI Sumsel',
      type: "website",
      author: 'HIPMI Sumsel',
      canonical: 'https://payungmadinah.id/projects',
      description: 'Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Project',
         }
      ]
   });
});

module.exports = router;