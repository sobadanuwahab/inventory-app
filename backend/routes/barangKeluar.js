import express from "express";
import {
  getBarangKeluar,
  createBarangKeluar,
} from "../controllers/barangKeluarController.js";

const router = express.Router();

router.get("/", getBarangKeluar);
router.post("/", createBarangKeluar);

export default router;
