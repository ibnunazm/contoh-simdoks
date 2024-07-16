import express from "express";
import {
  getArchives,
  getArchiveById,
  createArchive,
  updateArchive,
  deleteArchive,
  getArchivesBySubtypeId,
  filterByYears,
  searchArchive,
} from "../controllers/ArchiveController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/archives", verifyToken, getArchives);
router.get("/archive/:id", verifyToken, getArchiveById);
router.post("/archive", verifyToken, createArchive);
router.patch("/archive/:id", verifyToken, updateArchive);
router.delete("/archive/:id", verifyToken, deleteArchive);
router.get("/getarchive/subtype", verifyToken, getArchivesBySubtypeId);
router.get("/getarchive/year", verifyToken, filterByYears);
router.get("/archives/search", verifyToken, searchArchive);

export default router;
