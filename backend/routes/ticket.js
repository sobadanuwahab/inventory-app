import express from "express";
import {
  getTicketMasuk,
  createTicketMasuk,
} from "../controllers/ticketController.js";

const router = express.Router();
import { getJumlahPenontonPerStudio } from "../controllers/ticketController.js";
import { getTiketHariIniPerStudio } from "../controllers/ticketController.js";

router.get("/", getTicketMasuk);
router.post("/", createTicketMasuk);
router.get("/summary/studio", getJumlahPenontonPerStudio);
router.get("/summary/group-today", getTiketHariIniPerStudio);

export default router;
