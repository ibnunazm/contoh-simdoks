import express from "express";
import {
  getProgramSubtypes,
  getProgramSubtypeById,
  createProgramSubtype,
  updateProgramSubtype,
  deleteProgramSubtype,
  searchProgramSubtype,
} from "../controllers/ProgramSubtypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/programSubtypes", verifyToken, getProgramSubtypes);
router.get("/programSubtype/:id", verifyToken, getProgramSubtypeById);
router.post("/programSubtype", verifyToken, createProgramSubtype);
router.patch("/programSubtype/:id", verifyToken, updateProgramSubtype);
router.delete("/programSubtype/:id", verifyToken, deleteProgramSubtype);
router.get("/programSubtypes/search", verifyToken, searchProgramSubtype);

export default router;