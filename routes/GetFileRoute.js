import express from "express";
import {
  getFile,
  getAllFilesDeletedIn7Days,
  getTotalPagesDeletedIn7Days,
  getReminderTotalFileDeletePerDaysIn7Days,
  searchFileDeletedIn7Days
} from "../controllers/GetFile.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/getFile", verifyToken, getFile);
router.get(
  "/getAllFilesDeletedIn7Days",
  verifyToken,
  getAllFilesDeletedIn7Days
);
router.get(
  "/getTotalPagesDeletedIn7Days",
  verifyToken,
  getTotalPagesDeletedIn7Days
);
router.get(
  "/getReminderTotalFileDeletePerDaysIn7Days",
  verifyToken,
  getReminderTotalFileDeletePerDaysIn7Days
);
router.get(
  "/searchFileDeletedIn7Days", verifyToken, searchFileDeletedIn7Days
);

export default router;
