import express from "express";
import {
  getBarangMasuk,
  createBarangMasuk,
} from "../controllers/barangMasukController.js";

const router = express.Router();

router.get("/", getBarangMasuk);
router.post("/", createBarangMasuk);

export default router;
