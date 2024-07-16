import express from "express";
import {
  getAccreditations,
  getAccreditationById,
  createAccreditation,
  updateAccreditation,
  deleteAccreditation,
  searchAccreditation,
  filterByYears,
} from "../controllers/AccreditationController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/Accreditations", verifyToken, getAccreditations);
router.get("/Accreditation/:id", verifyToken, getAccreditationById);
router.post("/Accreditation", verifyToken, createAccreditation);
router.patch("/Accreditation/:id", verifyToken, updateAccreditation);
router.delete("/Accreditation/:id", verifyToken, deleteAccreditation);
router.get("/Accreditations/search", verifyToken, searchAccreditation);
router.get("/Accreditations/filter", verifyToken, filterByYears);

export default router;
