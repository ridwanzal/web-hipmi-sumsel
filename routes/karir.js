const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', async (req, res) => {
   try {
      const [karirList] = await promisePool.query('SELECT * FROM karir ORDER BY created_at DESC');
      res.render('pages/karir', {
         title: 'Karir - Payung Madinah',
         type: "article",
         canonical: 'https://payungmadinah.id/karir',
         author: 'Payung Madinah',
         type: "article",
         description: 'Karir - Payung Madinah',
         keywords: 'Wujudkan impian Umroh Anda bersama Payung Madinah. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya',
         breadcrumbs: [
            { name: 'Home', link: '/' },
            { name: 'Karir', link: '/karir' }
         ],
         karirList
      });
   } catch (err) {
      console.error('Query error:', err);
      res.status(500).send('Database error');
   }
});

module.exports = router;
