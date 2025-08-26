const express = require('express');
const router = express.Router();
const { connection } = require('../../config/db');
const upload = require('../../middleware/uploaderSingle');

// Helper: format Date untuk MySQL DATETIME
function formatDate(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}


router.post('/add', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'thumbnails', maxCount: 10 }
]), (req, res) => {
  const {
    name, subtitle, tanggal, total_hari, jenis_penerbangan,
    maskapai, hotel_makkah, hotel_madinah, hotel_makkah_star,
    hotel_madinah_star, paket, harga, deskripsi, tagline,
    starting_from, slug
  } = req.body;

  const finalSlug = slug && slug.trim()
    ? slug.trim()
    : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const mainFile = req.files['thumbnail']?.[0] || null;

  if (!mainFile || !name || !subtitle || !tanggal || !total_hari || !jenis_penerbangan ||
      !maskapai || !hotel_makkah || !hotel_madinah || !hotel_makkah_star ||
      !hotel_madinah_star || !paket || !harga || !deskripsi || !tagline || !starting_from) {
    return res.status(400).json({ error: 'Semua field wajib diisi.' });
  }

  const sql = `
    INSERT INTO umroh (
      name, subtitle, thumbnail, tanggal, total_hari, jenis_penerbangan, maskapai,
      hotel_makkah, hotel_madinah, hotel_makkah_star, hotel_madinah_star, paket,
      harga, deskripsi, tagline, starting_from, slug, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const now = formatDate(new Date());
  const params = [
    name, subtitle, mainFile.filename, tanggal, total_hari, jenis_penerbangan, maskapai,
    hotel_makkah, hotel_madinah, hotel_makkah_star, hotel_madinah_star, paket,
    harga, deskripsi, tagline, starting_from, finalSlug, now, now
  ];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: err });
    }

    const umrohId = result.insertId;

    if (req.files['thumbnails']?.length) {
      const galleryValues = req.files['thumbnails'].map(f => [umrohId, f.filename]);
      connection.query(
        `INSERT INTO umroh_images (umroh_id, image_path) VALUES ?`,
        [galleryValues],
        (err2) => {
          if (err2) console.error('Gallery insert error:', err2);
          return res.redirect('/admin/umroh?umroh=added');
        }
      );
    } else {
      return res.redirect('/admin/umroh?umroh=added');
    }
  });
});


router.post('/edit/:id', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'thumbnails', maxCount: 10 }
]), (req, res) => {
  const { id } = req.params;
  const {
    name, subtitle, tanggal, total_hari, jenis_penerbangan,
    maskapai, hotel_makkah, hotel_madinah, hotel_makkah_star,
    hotel_madinah_star, paket, harga, deskripsi, tagline,
    starting_from, slug
  } = req.body;

  const mainFile = req.files['thumbnail']?.[0] || null;

  if (!name || !subtitle || !tanggal || !total_hari || !jenis_penerbangan ||
      !maskapai || !hotel_makkah || !hotel_madinah || !hotel_makkah_star ||
      !hotel_madinah_star || !paket || !harga || !deskripsi || !tagline || !starting_from) {
    return res.status(400).json({ error: 'Semua field wajib diisi.' });
  }

  const now = formatDate(new Date());
  const fields = [
    'name = ?', 'subtitle = ?', 'tanggal = ?', 'total_hari = ?',
    'jenis_penerbangan = ?', 'maskapai = ?', 'hotel_makkah = ?',
    'hotel_madinah = ?', 'hotel_makkah_star = ?', 'hotel_madinah_star = ?',
    'paket = ?', 'harga = ?', 'deskripsi = ?', 'tagline = ?',
    'starting_from = ?', 'updated_at = ?'
  ];
  const values = [
    name, subtitle, tanggal, total_hari, jenis_penerbangan, maskapai,
    hotel_makkah, hotel_madinah, hotel_makkah_star, hotel_madinah_star,
    paket, harga, deskripsi, tagline, starting_from, now
  ];

  if (slug && slug.trim()) {
    fields.push('slug = ?');
    values.push(slug.trim());
  }

  if (mainFile) {
    fields.unshift('thumbnail = ?');
    values.unshift(mainFile.filename);
  }

  values.push(id);

  const sql = `UPDATE umroh SET ${fields.join(', ')} WHERE id = ?`;

  connection.query(sql, values, (err) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Gagal mengedit paket umroh.' });
    }

    // If user uploaded new thumbnails
    if (req.files['thumbnails']?.length) {
      // 1. Delete old images
      connection.query(
        `DELETE FROM umroh_images WHERE umroh_id = ?`,
        [id],
        (delErr) => {
          if (delErr) {
            console.error('Gallery delete error:', delErr);
            return res.status(500).json({ error: 'Gagal menghapus gambar lama.' });
          }

          // 2. Insert new images
          const galleryValues = req.files['thumbnails'].map(f => [id, f.filename]);
          connection.query(
            `INSERT INTO umroh_images (umroh_id, image_path) VALUES ?`,
            [galleryValues],
            (insertErr) => {
              if (insertErr) {
                console.error('Gallery insert error:', insertErr);
              }
              return res.redirect('/admin/umroh?umroh=edited');
            }
          );
        }
      );
    } else {
      // No new gallery uploaded → skip replacing
      return res.redirect('/admin/umroh?umroh=edited');
    }
  });
});


// DELETE
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM umroh_images WHERE umroh_id = ?', [id], (err1) => {
    if (err1) console.error('Delete images error:', err1);

    connection.query('DELETE FROM umroh WHERE id = ?', [id], (err2) => {
      if (err2) {
        console.error('Delete umroh error:', err2);
        return res.status(500).json({ error: 'Gagal menghapus paket umroh.' });
      }
      return res.redirect('/admin/umroh?umroh=deleted');
    });
  });
});

module.exports = router;