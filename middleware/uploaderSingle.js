// middleware/uploaderSingle.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Folder sementara untuk upload mentah
const tempPath = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempPath); // simpan ke folder sementara
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
