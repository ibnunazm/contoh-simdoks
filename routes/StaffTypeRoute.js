import express from "express";
import {
  getStaffTypes,
  getStaffTypeById,
  createStaffType,
  updateStaffType,
  deleteStaffType,
  searchStaffType,
} from "../controllers/StaffTypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/staffTypes", verifyToken, getStaffTypes);
router.get("/staffType/:id", verifyToken, getStaffTypeById);
router.post("/staffType", verifyToken, createStaffType);
router.patch("/staffType/:id", verifyToken, updateStaffType);
router.delete("/staffType/:id", verifyToken, deleteStaffType);
router.get("/staffTypes/search", verifyToken, searchStaffType);

export default router;
