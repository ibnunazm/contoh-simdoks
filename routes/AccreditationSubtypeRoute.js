import express from "express";
import {
  getAccreditationSubtypes,
  getAccreditationSubtypeById,
  createAccreditationSubtype,
  updateAccreditationSubtype,
  deleteAccreditationSubtype,
  searchAccreditationSubtype,
} from "../controllers/AccreditationSubtypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/accreditationSubtypes", verifyToken, getAccreditationSubtypes);
router.get("/accreditationSubtype/:id", verifyToken, getAccreditationSubtypeById);
router.post("/accreditationSubtype", verifyToken, createAccreditationSubtype);
router.patch("/accreditationSubtype/:id", verifyToken, updateAccreditationSubtype);
router.delete("/accreditationSubtype/:id", verifyToken, deleteAccreditationSubtype);
router.get("/accreditationSubtypes/search", verifyToken, searchAccreditationSubtype);

export default router;