import conn from "../config/db.js";

export const getAllStudios = (req, res) => {
  conn.query("SELECT * FROM studio ORDER BY nama", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};
