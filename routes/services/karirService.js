// routes/services/karirService.js
const express = require('express');
const router = express.Router();
const { connection } = require('../../config/db');
const dayjs = require('dayjs');

// Add new Karir
router.post('/add', async (req, res) => {
  try {
    const {
      nama_lowongan,
      penempatan,
      status,
      status_penempatan,
      jenjang,
      kualifikasi
    } = req.body;

    const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = createdAt;

    const sql = `
      INSERT INTO karir 
      (nama_lowongan, penempatan, status, status_penempatan, jenjang, kualifikasi, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      sql,
      [
        nama_lowongan,
        penempatan,
        status,
        status_penempatan,
        jenjang,
        kualifikasi,
        createdAt,
        updatedAt
      ],
      (err, result) => {
        if (err) {
          console.error('Error inserting karir:', err);
          return res.status(500).send('Gagal menambahkan karir');
        }
        res.redirect('/admin/karir'); // redirect back to karir page
      }
    );
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Terjadi kesalahan server');
  }
});

// Delete Karir
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM karir WHERE id = ?`;

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting karir:', err);
      return res.status(500).send('Gagal menghapus karir');
    }
    res.redirect('/admin/karir');
  });
});

module.exports = router;
