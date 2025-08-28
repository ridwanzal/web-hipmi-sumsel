const express = require('express');
const { link } = require('fs');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', function (req, res, next) {
   res.render('pages/works', {
      title: 'Our Work - HIPMI Sumsel',
      type: "website",
      author: 'HIPMI Sumsel',
      description: 'Projects dan Products yang sedang kami kerjakan',
      canonical: 'https://payungmadinah.id/works',
      keywords: 'Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula',
      breadcrumbs: [
         {
            name: 'Home',
            link: '/'
         },
         {
            name: 'Our Work',
            link: '/works'
         }
      ]
   });
});

module.exports = router;