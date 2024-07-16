import express from "express";
import {
  getArchiveSubtypes,
  getArchiveSubtypeById,
  createArchiveSubtype,
  updateArchiveSubtype,
  deleteArchiveSubtype,
  searchArchiveSubtype,
} from "../controllers/ArchiveSubtypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/archiveSubtypes", verifyToken, getArchiveSubtypes);
router.get("/archiveSubtype/:id", verifyToken, getArchiveSubtypeById);
router.post("/archiveSubtype", verifyToken, createArchiveSubtype);
router.patch("/archiveSubtype/:id", verifyToken, updateArchiveSubtype);
router.delete("/archiveSubtype/:id", verifyToken, deleteArchiveSubtype);
router.get("/archiveSubtypes/search", verifyToken, searchArchiveSubtype);

export default router;