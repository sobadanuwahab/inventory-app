import conn from "../config/db.js";

// Ambil semua data member parkir
export const getMemberParkir = (req, res) => {
  const sql = "SELECT * FROM member_parkir ORDER BY id DESC";
  conn.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// Tambah data baru
export const createMemberParkir = (req, res) => {
  const {
    nama_stnk,
    nomor_kartu,
    nama_pemilik,
    plat_nomor,
    jenis_kendaraan,
    no_telp,
    tanggal_registrasi,
  } = req.body;

  const sql = `
    INSERT INTO member_parkir
    (nama_stnk, nomor_kartu, nama_pemilik, plat_nomor, jenis_kendaraan, no_telp, tanggal_registrasi)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nama_stnk,
    nomor_kartu,
    nama_pemilik,
    plat_nomor,
    jenis_kendaraan,
    no_telp,
    tanggal_registrasi,
  ];

  conn.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({ message: "Data member parkir ditambahkan", id: result.insertId });
  });
};

// Hapus data
export const deleteMemberParkir = (req, res) => {
  const { id } = req.params;
  conn.query("DELETE FROM member_parkir WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Data berhasil dihapus" });
  });
};

// Edit/update data
export const updateMemberParkir = (req, res) => {
  const { id } = req.params;
  const {
    nama_stnk,
    nomor_kartu,
    nama_pemilik,
    plat_nomor,
    jenis_kendaraan,
    no_telp,
    tanggal_registrasi,
  } = req.body;

  const sql = `
    UPDATE member_parkir SET
    nama_stnk = ?, nomor_kartu = ?, nama_pemilik = ?, plat_nomor = ?, jenis_kendaraan = ?, no_telp = ?, tanggal_registrasi = ?
    WHERE id = ?
  `;

  const values = [
    nama_stnk,
    nomor_kartu,
    nama_pemilik,
    plat_nomor,
    jenis_kendaraan,
    no_telp,
    tanggal_registrasi,
    id,
  ];

  conn.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Data berhasil diperbarui" });
  });
};
