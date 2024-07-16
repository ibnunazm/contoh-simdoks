import express from "express";
import {
  getAccreditationTypes,
  getAccreditationTypeById,
  createAccreditationType,
  updateAccreditationType,
  deleteAccreditationType,
  searchAccreditationType,
} from "../controllers/AccreditationTypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/accreditationTypes", verifyToken, getAccreditationTypes);
router.get("/accreditationType/:id", verifyToken, getAccreditationTypeById);
router.post("/accreditationType", verifyToken, createAccreditationType);
router.patch("/accreditationType/:id", verifyToken, updateAccreditationType);
router.delete("/accreditationType/:id", verifyToken, deleteAccreditationType);
router.get("/accreditationTypes/search", verifyToken, searchAccreditationType);

export default router;