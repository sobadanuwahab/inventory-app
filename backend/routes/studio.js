import express from "express";
import { getAllStudios } from "../controllers/studioController.js";

const router = express.Router();

router.get("/", getAllStudios);

export default router;
