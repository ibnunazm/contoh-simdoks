import express from "express";
import {
  getArchiveTypes,
  getArchiveTypeById,
  createArchiveType,
  updateArchiveType,
  deleteArchiveType,
  searchArchiveType,
} from "../controllers/ArchiveTypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/archiveTypes", verifyToken, getArchiveTypes);
router.get("/archiveType/:id", verifyToken, getArchiveTypeById);
router.post("/archiveType", verifyToken, createArchiveType);
router.patch("/archiveType/:id", verifyToken, updateArchiveType);
router.delete("/archiveType/:id", verifyToken, deleteArchiveType);
router.get("/archiveTypes/search", verifyToken, searchArchiveType);

export default router;