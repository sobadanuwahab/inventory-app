import conn from "../config/db.js";

// GET all barang keluar
export const getBarangKeluar = (req, res) => {
  const query = "SELECT * FROM barang_keluar ORDER BY id DESC";
  conn.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
};

// POST barang keluar baru
export const createBarangKeluar = (req, res) => {
  const { nama, jumlah, tanggal, keterangan } = req.body;
  const query =
    "INSERT INTO barang_keluar (nama, jumlah, tanggal, keterangan) VALUES (?, ?, ?, ?)";
  conn.query(query, [nama, jumlah, tanggal, keterangan], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({
      message: "Barang keluar berhasil disimpan",
      id: result.insertId,
    });
  });
};
