import express from "express";
import {
  getMemberParkir,
  createMemberParkir,
  deleteMemberParkir,
  updateMemberParkir,
} from "../controllers/memberParkirController.js";

const router = express.Router();

router.get("/", getMemberParkir);
router.post("/", createMemberParkir);
router.delete("/:id", deleteMemberParkir);
router.put("/:id", updateMemberParkir);

export default router;
