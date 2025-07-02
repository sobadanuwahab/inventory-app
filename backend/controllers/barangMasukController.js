import conn from "../config/db.js";

// GET all barang masuk
export const getBarangMasuk = (req, res) => {
  const query = "SELECT * FROM barang_masuk ORDER BY id DESC";
  conn.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
};

// POST barang masuk baru
export const createBarangMasuk = (req, res) => {
  const { nama, jumlah, tanggal, keterangan } = req.body;
  const query =
    "INSERT INTO barang_masuk (nama, jumlah, tanggal, keterangan) VALUES (?, ?, ?, ?)";
  conn.query(query, [nama, jumlah, tanggal, keterangan], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({
      message: "Barang masuk berhasil disimpan",
      id: result.insertId,
    });
  });
};
