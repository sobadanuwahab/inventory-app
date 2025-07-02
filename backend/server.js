import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import barangMasukRoutes from "./routes/barangMasuk.js";
import barangKeluarRoutes from "./routes/barangKeluar.js";
import authRoutes from "./routes/auth.js";
import laporanRoutes from "./routes/laporan.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/masuk", barangMasukRoutes);
app.use("/api/keluar", barangKeluarRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/laporan", laporanRoutes);

app.get("/", (req, res) => {
  res.send("Inventory API is running!");
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
