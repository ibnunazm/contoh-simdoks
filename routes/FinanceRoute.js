import express from "express";
import {
    getFinances,
    getFinanceById,
    createFinance,
    updateFinance,
    deleteFinance,
    searchFinance,
    filterByYears,
} from "../controllers/FinanceController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/Finances", verifyToken, getFinances);
router.get("/Finance/:id", verifyToken, getFinanceById);
router.post("/Finance", verifyToken, createFinance);
router.patch("/Finance/:id", verifyToken, updateFinance);
router.delete("/Finance/:id", verifyToken, deleteFinance);
router.get("/Finances/search", verifyToken, searchFinance);
router.get("/Finances/filter", verifyToken, filterByYears);

export default router;