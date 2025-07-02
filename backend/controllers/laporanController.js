import conn from "../config/db.js";

export const getStokTerkini = (req, res) => {
  const query = `
    SELECT
      COALESCE(m.nama, k.nama) AS nama,
      COALESCE(SUM(m.jumlah), 0) AS total_masuk,
      COALESCE(SUM(k.jumlah), 0) AS total_keluar,
      COALESCE(SUM(m.jumlah), 0) - COALESCE(SUM(k.jumlah), 0) AS stok_tersisa
    FROM barang_masuk m
    FULL OUTER JOIN barang_keluar k ON m.nama = k.nama
    GROUP BY nama
    ORDER BY nama ASC;
  `;

  // Karena MySQL tidak mendukung FULL OUTER JOIN:
  const fallbackQuery = `
    SELECT
      nama,
      SUM(jumlah_masuk) AS total_masuk,
      SUM(jumlah_keluar) AS total_keluar,
      SUM(jumlah_masuk - jumlah_keluar) AS stok_tersisa
    FROM (
      SELECT nama, jumlah AS jumlah_masuk, 0 AS jumlah_keluar FROM barang_masuk
      UNION ALL
      SELECT nama, 0 AS jumlah_masuk, jumlah AS jumlah_keluar FROM barang_keluar
    ) AS gabung
    GROUP BY nama
    ORDER BY nama;
  `;

  conn.query(fallbackQuery, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};
