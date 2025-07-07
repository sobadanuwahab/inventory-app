import conn from "../config/db.js";

// Ambil data tiket dengan filter
export const getTicketMasuk = (req, res) => {
  const { tanggal, lokasi, user_id, role } = req.query;

  let sql = "SELECT * FROM ticket_masuk WHERE 1=1";
  const params = [];

  if (tanggal) {
    sql += " AND DATE(tanggal) = ?";
    params.push(tanggal);
  }

  if (lokasi) {
    sql += " AND lokasi_studio LIKE ?";
    params.push(`%${lokasi}%`);
  }

  // Jika bukan admin, hanya tampilkan data milik user tersebut
  if (role !== "admin" && user_id) {
    sql += " AND user_id = ?";
    params.push(user_id);
  }

  sql += " ORDER BY tanggal DESC";

  conn.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// Tambahkan data tiket masuk
export const createTicketMasuk = (req, res) => {
  const {
    user_id,
    data_show,
    judul_film,
    lokasi_studio,
    jumlah_masuk,
    jumlah_penonton,
    keterangan,
    petugas,
  } = req.body;

  const sql = `
    INSERT INTO ticket_masuk 
    (user_id, data_show, judul_film, lokasi_studio, jumlah_masuk, jumlah_penonton, keterangan, petugas)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    data_show,
    judul_film,
    lokasi_studio,
    jumlah_masuk,
    jumlah_penonton,
    keterangan,
    petugas,
  ];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Tiket masuk berhasil dicatat",
      id: result.insertId,
    });
  });
};

// Laporan jumlah penonton per studio
export const getJumlahPenontonPerStudio = (req, res) => {
  const sql = `
    SELECT 
      lokasi_studio,
      SUM(jumlah_penonton) AS total_penonton,
      (
        SELECT judul_film 
        FROM ticket_masuk AS t2
        WHERE t2.lokasi_studio = t1.lokasi_studio
        ORDER BY t2.tanggal DESC 
        LIMIT 1
      ) AS judul_terbaru
    FROM ticket_masuk AS t1
    GROUP BY lokasi_studio
    ORDER BY lokasi_studio
  `;

  conn.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// Data tiket masuk hari ini per studio
export const getTiketHariIniPerStudio = (req, res) => {
  const { user_id, role } = req.query;

  let sql = `
    SELECT lokasi_studio, judul_film, data_show, jumlah_penonton
    FROM ticket_masuk
    WHERE DATE(tanggal) = CURDATE()
  `;
  const params = [];

  if (role !== "admin" && user_id) {
    sql += " AND user_id = ?";
    params.push(user_id);
  }

  sql += " ORDER BY lokasi_studio ASC, id ASC";

  conn.query(sql, params, (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: err });
    }

    const grouped = {};
    results.forEach((row) => {
      const show = row.data_show || "-";

      if (!grouped[row.lokasi_studio]) {
        grouped[row.lokasi_studio] = [];
      }

      grouped[row.lokasi_studio].push({
        judul_film: row.judul_film,
        show: show,
        total_penonton: row.jumlah_penonton,
      });
    });

    const formatted = Object.entries(grouped).map(([lokasi, filmList]) => ({
      lokasi_studio: lokasi,
      film: filmList,
    }));

    res.json(formatted);
  });
};
