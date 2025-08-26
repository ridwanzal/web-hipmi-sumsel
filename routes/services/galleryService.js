// routes/services/galleryService.js
const express = require('express');
const router = express.Router();
const { connection } = require('../../config/db');
const upload = require('../../middleware/uploaderSingle'); // multer.diskStorage
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

router.post('/add', upload.array('filename', 10), async (req, res) => {
  const { type } = req.body; // thaif, turki, dubai, alula
  const createdAt = new Date();

  // Validate `type`
  const allowedTypes = ['thaif', 'turki', 'dubai', 'alula'];
  if (!allowedTypes.includes(type)) {
    req.session.error = 'Tipe galeri tidak valid.';
    return res.redirect('/admin/galeri');
  }

  if (!req.files || req.files.length === 0) {
    req.session.error = 'Tidak ada file yang diunggah.';
    return res.redirect('/admin/galeri');
  }

  try {
    const savedFiles = [];
    const uploadDir = path.join(__dirname, `../../public/uploads/`);
    fs.mkdirSync(uploadDir, { recursive: true });

    for (const [index, file] of req.files.entries()) {
      // Create unique filename
      const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname) || '.jpg';
      const filename = `img_${uniqueId}_${index}${ext}`;
      const outputPath = path.join(uploadDir, filename);

      // Resize & compress
      await sharp(file.path)
        .resize(800)
        .jpeg({ quality: 70 })
        .toFile(outputPath);

      // Remove temp file
      fs.unlink(file.path, (err) => {
        if (err) console.error('Gagal hapus file temp:', err);
      });

      savedFiles.push({
        type,
        filename,
        created_at: createdAt
      });
    }

    const insertSql = `
      INSERT INTO gallery (type, filename, created_at)
      VALUES ?
    `;
    const values = savedFiles.map(file => [
      file.type,
      file.filename,
      file.created_at
    ]);

    await new Promise((resolve, reject) => {
      connection.query(insertSql, [values], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    req.session.success = 'Gambar berhasil ditambahkan ke galeri.';
    res.redirect('/admin/galeri');
  } catch (error) {
    console.error('Error adding gallery images:', error);
    req.session.error = 'Gagal menambahkan gambar.';
    res.redirect('/admin/galeri');
  }
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;

  connection.query('SELECT filename FROM gallery WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      req.session.error = 'Gagal menghapus gambar.';
      return res.redirect('/admin/galeri');
    }

    if (results.length === 0) {
      req.session.error = 'Gambar tidak ditemukan.';
      return res.redirect('/admin/galeri');
    }

    const filePath = path.join(__dirname, '../../public/uploads', results[0].filename);

    // Hapus dari database
    connection.query('DELETE FROM gallery WHERE id = ?', [id], (err2) => {
      if (err2) {
        console.error('Delete error:', err2);
        req.session.error = 'Gagal menghapus gambar.';
        return res.redirect('/admin/galeri');
      }

      // Hapus file dari disk
      fs.unlink(filePath, (fsErr) => {
        if (fsErr) {
          console.error('File delete error:', fsErr);
        }
        req.session.success = 'Gambar berhasil dihapus.';
        res.redirect('/admin/galeri');
      });
    });
  });
});

module.exports = router;
