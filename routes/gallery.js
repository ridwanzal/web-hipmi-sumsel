const express = require("express");
const router = express.Router();
const { connection } = require("../config/db");

router.get("/", function (req, res, next) {
  const query = `
    SELECT id, filename, type, created_at
    FROM gallery
    ORDER BY created_at DESC
  `;

  connection.query(query, function (err, rows) {
    if (err) throw err;

    // Pisahkan berdasarkan type
    const galleryThaif = rows.filter(item => item.type === "thaif");
    const galleryDubai = rows.filter(item => item.type === "dubai");
    const galleryTurki = rows.filter(item => item.type === "turki");

    res.render("pages/gallery", {
      messageContact: req.session.messageContact,
      title: "Galeri - HIPMI Sumsel",
      type: "website",
      author: "HIPMI Sumsel",
      description: "Galeri",
      canonical: "https://payungmadinah.id/galeri",
      keywords:
        "Umroh, Haji, Umroh Plus, Umroh Plus Dubai, Umroh Plus Thaif, Umroh Plus Turki, Umroh Plus Al-Ula",
      breadcrumbs: [
        { name: "Home", link: "/" },
        { name: "Galeri", link: "/galeri" },
      ],
      galleryThaif,
      galleryDubai,
      galleryTurki
    });
  });
});

module.exports = router;
