import mysql from "mysql2";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // ganti dengan password MySQL kamu
  database: "inventory_db",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL connected!");
});

export default conn;
