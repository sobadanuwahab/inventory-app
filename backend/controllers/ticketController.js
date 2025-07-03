import conn from "../config/db.js";

export const getTicketMasuk = (req, res) => {
  const { tanggal, lokasi } = req.query;

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

  sql += " ORDER BY tanggal DESC";

  conn.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

export const createTicketMasuk = (req, res) => {
  const {
    judul_film,
    lokasi_studio,
    jumlah_masuk,
    jumlah_penonton,
    keterangan,
    petugas,
  } = req.body;
  const sql = `
    INSERT INTO ticket_masuk (judul_film, lokasi_studio, jumlah_masuk, jumlah_penonton, keterangan, petugas)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  conn.query(
    sql,
    [
      judul_film,
      lokasi_studio,
      jumlah_masuk,
      jumlah_penonton,
      keterangan,
      petugas,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Tiket masuk berhasil dicatat", id: result.insertId });
    }
  );
};

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

export const getTiketHariIniPerStudio = (req, res) => {
  const sql = `
    SELECT lokasi_studio, judul_film, SUM(jumlah_penonton) AS total_penonton
    FROM ticket_masuk
    WHERE DATE(tanggal) = CURDATE()
    GROUP BY lokasi_studio, judul_film
    ORDER BY lokasi_studio, judul_film
  `;

  conn.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    // Gabungkan berdasarkan lokasi_studio
    const grouped = {};
    results.forEach((row) => {
      if (!grouped[row.lokasi_studio]) {
        grouped[row.lokasi_studio] = [];
      }
      grouped[row.lokasi_studio].push({
        judul_film: row.judul_film,
        total_penonton: row.total_penonton,
      });
    });

    const formatted = Object.entries(grouped).map(([lokasi, filmList]) => ({
      lokasi_studio: lokasi,
      film: filmList,
    }));

    res.json(formatted);
  });
};
