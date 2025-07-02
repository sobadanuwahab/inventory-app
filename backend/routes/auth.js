import express from "express";
import { login, getUserById } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

router.get("/me/:id", getUserById);

export default router;
