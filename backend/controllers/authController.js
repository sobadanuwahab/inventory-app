import conn from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// LOGIN
export const login = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  conn.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        lokasi_bioskop: user.lokasi_bioskop, // ✅ tambahkan ini
      },
    });
  });
};

// GET USER BY ID (for profile / sidebar)
export const getUserById = (req, res) => {
  const { id } = req.params;
  conn.query(
    "SELECT id, username, role FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ message: "User tidak ditemukan" });
      res.json(results[0]);
    }
  );
};
