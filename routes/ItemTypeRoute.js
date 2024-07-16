import express from "express";
import {
  getItemTypes,
  getItemTypeById,
  createItemType,
  updateItemType,
  deleteItemType,
  searchItemType,
} from "../controllers/ItemTypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/itemTypes", verifyToken, getItemTypes);
router.get("/itemType/:id", verifyToken, getItemTypeById);
router.post("/itemType", verifyToken, createItemType);
router.patch("/itemType/:id", verifyToken, updateItemType);
router.delete("/itemType/:id", verifyToken, deleteItemType);
router.get("/itemTypes/search", verifyToken, searchItemType);

export default router;