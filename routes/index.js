const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

router.get('/', async (req, res, next) => {
   try {
      const [umrohList] = await promisePool.query('SELECT * FROM umroh ORDER BY created_at DESC');
      res.render('index', {
         title: 'HIPMI Sumsel - Himpunan Pengusaha Muda Indonesia Sumatera Selatan',
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

module.exports = router;
