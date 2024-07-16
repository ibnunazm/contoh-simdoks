import express from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemsBySubtypeId,
  searchItem,
  filterByYears,
} from "../controllers/ItemController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/Items", verifyToken, getItems);
router.get("/Item/:id", verifyToken, getItemById);
router.post("/Item", verifyToken, createItem);
router.patch("/Item/:id", verifyToken, updateItem);
router.delete("/Item/:id", verifyToken, deleteItem);
router.get("/getItem/subtype", verifyToken, getItemsBySubtypeId);
router.get("/getItem/year", verifyToken, filterByYears);
router.get("/Items/search", verifyToken, searchItem);

export default router;
