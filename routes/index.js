const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', async (req, res, next) => {
   try {
      const [umrohList] = await promisePool.query('SELECT * FROM umroh ORDER BY created_at DESC');
      res.render('index', {
         title: 'Payung Madinah - Spesialis Umroh Plus',
         type: 'website',
         canonical: 'https://payungmadinah.id/',
         author: 'Payung Madinah',
         description: 'Wujudkan impian Umroh Anda bersama Payung Madinah...',
         keywords: 'Umroh Plus, Payung Madinah, Travel Umroh Terpercaya',
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

module.exports = router;
