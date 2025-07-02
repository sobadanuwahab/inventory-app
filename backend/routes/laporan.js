import express from "express";
import { getStokTerkini } from "../controllers/laporanController.js";

const router = express.Router();

router.get("/stok", getStokTerkini);

export default router;
