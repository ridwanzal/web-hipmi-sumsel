const express = require("express");
const router = express.Router();
const { promisePool } = require('../config/db');
const { connection } = require('../config/db');

const checkLogin = require("../middleware/auth"); // adjust path as needed

router.get("/", function (req, res, next) {
  if (req.session.loggedin) {
    const sql = "SELECT * FROM blogs ORDER BY created_at DESC";
    
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching blogs:", err);
        return res.status(500).render("pages/admin/blog", {
          messageAuth: req.session.messageAuth,
          title: "Admin - HIPMI Sumsel",
          author: "M. Ridwan Zalbina",
          canonical: "https://payungmadinah.id/pages/linkpage",
          description:
            "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
          breadcrumbs: [{ name: "Home", link: "/" }],
          error: "Gagal mengambil data artikel."
        });
      }

      res.render("pages/admin/blog", {
        messageAuth: req.session.messageAuth,
        title: "Admin - HIPMI Sumsel",
        author: "M. Ridwan Zalbina",
        canonical: "https://payungmadinah.id/pages/linkpage",
        description:
          "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
        breadcrumbs: [{ name: "Home", link: "/" }],
        data: results // 👈 Send data to Handlebars
      });
    });

  } else {
    res.render("pages/admin/login", {
      messageAuth: req.session.messageAuth,
      title: "Admin - HIPMI Sumsel",
      author: "M. Ridwan Zalbina",
      canonical: "https://payungmadinah.id/pages/linkpage",
      breadcrumbs: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Blog",
        link: "/admin/berita",
      },
    ],
      description: 
        "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
    });
  }
});

router.get("/umroh", function (req, res, next) {
  if (req.session.loggedin) {
    const sql = "SELECT * FROM umroh ORDER BY created_at DESC";
    
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching blogs:", err);
        return res.status(500).render("pages/admin/umroh", {
          messageAuth: req.session.messageAuth,
          title: "Admin - HIPMI Sumsel",
          author: "M. Ridwan Zalbina",
          canonical: "https://payungmadinah.id/pages/linkpage",
          description:
            "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
          breadcrumbs: [{ name: "Home", link: "/" }],
          error: "Gagal mengambil data artikel."
        });
      }

      res.render("pages/admin/umroh", {
        messageAuth: req.session.messageAuth,
        title: "Admin - HIPMI Sumsel",
        author: "M. Ridwan Zalbina",
        canonical: "https://payungmadinah.id/pages/linkpage",
        description:
          "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
        breadcrumbs: [{ name: "Home", link: "/" }],
        umroh: results // 👈 Send data to Handlebars
      });
    });

  } else {
    res.render("pages/admin/login", {
      messageAuth: req.session.messageAuth,
      title: "Admin - HIPMI Sumsel",
      author: "M. Ridwan Zalbina",
      canonical: "https://payungmadinah.id/pages/linkpage",
      breadcrumbs: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Blog",
        link: "/admin/berita",
      },
    ],
      description: 
        "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
    });
  }
});

router.get("/umroh/edit/:id", checkLogin, function (req, res, next) {
  const { id } = req.params;

  // 1. Get Umroh main data
  const sqlUmroh = "SELECT * FROM umroh WHERE id = ?";
  connection.query(sqlUmroh, [id], function (err, umrohResults) {
    if (err) {
      console.error("Error fetching Umroh:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (umrohResults.length === 0) {
      return res.status(404).send("Produk Umroh tidak ditemukan");
    }

    const umroh = umrohResults[0];

    // 2. Get Umroh images data
    const sqlImages = "SELECT * FROM umroh_images WHERE umroh_id = ?";
    connection.query(sqlImages, [id], function (err2, imagesResults) {
      if (err2) {
        console.error("Error fetching Umroh images:", err2);
        return res.status(500).send("Internal Server Error");
      }

      // 3. Render with both umroh + images
      res.render("pages/admin/umroh-edit", {
        umroh,
        umroh_images: imagesResults, // send images array to view
        messageAuth: req.session.messageAuth,
        title: "Edit Produk Umroh - HIPMI Sumsel",
        author: "M. Ridwan Zalbina",
        breadcrumbs: [
          { name: "Home", link: "/" },
          { name: "Umroh", link: "/admin/umroh" },
          { name: "Edit Produk Umroh", link: "/admin/umroh/edit/" + id }
        ],
        canonical: "https://payungmadinah.id/pages/linkpage",
        description:
          "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
      });
    });
  });
});


router.get("/blog/edit/:id", checkLogin, function (req, res, next) {
  const { id } = req.params;
  const sql = "SELECT * FROM blogs WHERE id = ?";
  
  connection.query(sql, [id], function (err, results) {
    if (err) {
      console.error("Error fetching blog:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).send("Artikel tidak ditemukan");
    }

    const blog = results[0];

    res.render("pages/admin/blog-edit", {
      blog,
      messageAuth: req.session.messageAuth,
      title: "Edit Artikel - HIPMI Sumsel",
      author: "M. Ridwan Zalbina",
    breadcrumbs: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Blog",
        link: "/admin/",
      },
      {
        name: "Edit Artikel Blog",
        link: "/admin/blog/edit/" + id,
      }
    ],
      canonical: "https://payungmadinah.id/pages/linkpage",
      description:
        "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
    });
  });
});

router.get("/berita", checkLogin, function (req, res, next) {
  res.render("pages/admin/index", {
    messageAuth: req.session.messageAuth,
    title: "Admin - HIPMI Sumsel",
    author: "M. Ridwan Zalbina",
    type: "website",
    canonical: "https://payungmadinah.id/pages/linkpage",
    description:
      "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
    keywords:
      "Wujudkan impian Umroh Anda bersama HIPMI Sumsel. Paket Umroh Plus dengan fasilitas terbaik, harga terjangkau, dan layanan terpercaya, HIPMI Sumsel, tentang HIPMI Sumsel, pengembangan web, layanan digital, UI/UX, brand identity, software house Indonesia",
    breadcrumbs: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Blog",
        link: "/admin/berita",
      },
    ],
  });
});

router.get("/galeri", checkLogin, function (req, res, next) {
  let query = "SELECT id, filename, type, created_at FROM gallery";
  connection.query(query, function (err, rows) {
    if (err) throw err;
    res.render("pages/admin/gallery", {
      messageAuth: req.session.messageAuth,
      title: "Admin - HIPMI Sumsel",
      author: "M. Ridwan Zalbina",
      canonical: "https://payungmadinah.id/pages/linkpage",
      gallery: rows,
      description:
        "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
      breadcrumbs: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Uploader",
          link: "/admin/uploader",
        },
      ],
    });
  });
});

router.get("/uploader", checkLogin, function (req, res, next) {
  let query = "SELECT id, filename, created_at FROM uploads";
  connection.query(query, function (err, rows) {
    if (err) throw err;
    res.render("pages/admin/uploader", {
      messageAuth: req.session.messageAuth,
      title: "Admin - HIPMI Sumsel",
      author: "M. Ridwan Zalbina",
      canonical: "https://payungmadinah.id/pages/linkpage",
      blog: rows,
      description:
        "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
      breadcrumbs: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Uploader",
          link: "/admin/uploader",
        },
      ],
    });
  });
});

router.get("/kontak", checkLogin, function (req, res, next) {
  res.render("pages/admin/contact", {
    messageAuth: req.session.messageAuth,
    title: "Admin - HIPMI Sumsel",
    author: "M. Ridwan Zalbina",
    canonical: "https://payungmadinah.id/pages/linkpage",
    description:
      "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
    breadcrumbs: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Kontak",
        link: "/admin/kontak",
      },
    ],
  });
});

router.get("/umroh-gratis", checkLogin, function (req, res, next) {
  const query = `
    SELECT 
      ug.id,
      ug.nama,
      ug.phone_number,
      ug.domisili,
      ug.jawaban,
      ug.umur,
      ug.gender,
      ug.created_at,
      ugu.thumnbnail
    FROM umroh_gratis ug
    LEFT JOIN umroh_gratis_uploads ugu ON ugu.id_umroh_gratis = ug.id
    ORDER BY ug.created_at DESC
  `;

  connection.query(query, (err, results) => {
    if (err) return res.status(500).send('Database error');

    // Kelompokkan berdasarkan ug.id
    const grouped = {};
    results.forEach(row => {
      if (!grouped[row.id]) {
        grouped[row.id] = {
          id: row.id,
          nama: row.nama,
          phone_number: row.phone_number,
          domisili: row.domisili,
          jawaban: row.jawaban,
          umur: row.umur,
          gender: row.gender,
          created_at: row.created_at,
          uploads: []
        };
      }
      if (row.thumnbnail) {
        grouped[row.id].uploads.push(row.thumnbnail);
      }
    });

    const finalData = Object.values(grouped);

    res.render('pages/admin/umroh-gratis', {
      messageAuth: req.session.messageAuth,
      title: "Umroh Gratis - HIPMI Sumsel",
      author: "M. Ridwan Zalbina",
      canonical: "https://payungmadinah.id/pages/linkpage",
      description: "Data Umroh Gratis - HIPMI Sumsel",
      breadcrumbs: [
        { name: "Home", link: "/" },
        { name: "Umroh Gratis", link: "/admin/umroh-gratis" },
      ],
      umroh_gratis: finalData // 👈 kirim data yang sudah dikelompokkan
    });
  });
});

router.get("/karir", checkLogin, function (req, res, next) {
  let query = "SELECT * from karir";
  connection.query(query, function (err, rows) {
    if (err) throw err;
    res.render("pages/admin/karir", {
      messageAuth: req.session.messageAuth,
      title: "Admin - HIPMI Sumsel",
      author: "M. Ridwan Zalbina",
      canonical: "https://payungmadinah.id/pages/linkpage",
      karir: rows,
      description: "Membantu klien untuk membangun produk digital mereka, web dan mobile app dengan kualitas terbaik dari HIPMI Sumsel",
      breadcrumbs: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Karir",
          link: "/admin/karir",
        },
      ],
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Session destroy error:", err);
    }
    res.redirect('/admin');
  });
});

module.exports = router;
