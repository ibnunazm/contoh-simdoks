import express from "express";
import {
  getProgramTypes,
  getProgramTypeById,
  createProgramType,
  updateProgramType,
  deleteProgramType,
  searchProgramType,
} from "../controllers/ProgramTypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/programTypes", verifyToken, getProgramTypes);
router.get("/programType/:id", verifyToken, getProgramTypeById);
router.post("/programType", verifyToken, createProgramType);
router.patch("/programType/:id", verifyToken, updateProgramType);
router.delete("/programType/:id", verifyToken, deleteProgramType);
router.get("/programTypes/search", verifyToken, searchProgramType);

export default router;