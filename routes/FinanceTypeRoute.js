import express from "express";
import {
    getFinanceTypes,
    getFinanceTypeById,
    createFinanceType,
    updateFinanceType,
    deleteFinanceType,
    searchFinanceType,
} from "../controllers/FinanceTypeController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/financeTypes", verifyToken, getFinanceTypes);
router.get("/financeType/:id", verifyToken, getFinanceTypeById);
router.post("/financeType", verifyToken, createFinanceType);
router.patch("/financeType/:id", verifyToken, updateFinanceType);
router.delete("/financeType/:id", verifyToken, deleteFinanceType);
router.get("/financeTypes/search", verifyToken, searchFinanceType);

export default router;