import express from "express";
import {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  searchProgram,
  filterByYears,
} from "../controllers/ProgramController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/Programs", verifyToken, getPrograms);
router.get("/Program/:id", verifyToken, getProgramById);
router.post("/Program", verifyToken, createProgram);
router.patch("/Program/:id", verifyToken, updateProgram);
router.delete("/Program/:id", verifyToken, deleteProgram);
router.get("/Programs/search", verifyToken, searchProgram);
router.get("/Programs/filter", verifyToken, filterByYears);

export default router;
