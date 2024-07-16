import express from "express";
import {
  getItemSubtypes,
  getItemSubtypeById,
  createItemSubtype,
  updateItemSubtype,
  deleteItemSubtype,
  searchItemSubtype,
} from "../controllers/ItemSubtypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/itemSubtypes", verifyToken, getItemSubtypes);
router.get("/itemSubtype/:id", verifyToken, getItemSubtypeById);
router.post("/itemSubtype", verifyToken, createItemSubtype);
router.patch("/itemSubtype/:id", verifyToken, updateItemSubtype);
router.delete("/itemSubtype/:id", verifyToken, deleteItemSubtype);
router.get("/itemSubtypes/search", verifyToken, searchItemSubtype);

export default router;