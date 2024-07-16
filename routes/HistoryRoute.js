import express from "express";
import {
  getHistoryUploads,
  getHistoryDelete,
  paginationHistoryUpload,
  paginationHistoryDelete,
  last7DaysUploads,
  last7DaysDeletes,
  getTotalpages,
  searchHistoryUploads,
  searchHistoryDeletes,
  postAllNotifications,
  readNotification,
  last7Days,
  getTotalpagesUploadsDeletesLast7Days,
  checkIfHaveNotification
} from "../controllers/HistoryController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/historyUploads", verifyToken, getHistoryUploads);
router.get("/historyDeletes", verifyToken, getHistoryDelete);
router.get("/historyUpload", verifyToken, paginationHistoryUpload);
router.get("/historyDelete", verifyToken, paginationHistoryDelete);
router.get("/last7DaysUploads", verifyToken, last7DaysUploads);
router.get("/last7DaysDeletes", verifyToken, last7DaysDeletes);
router.get("/totalPages", verifyToken, getTotalpages);
router.get("/searchHistoryUploads", verifyToken, searchHistoryUploads);
router.get("/searchHistoryDeletes", verifyToken, searchHistoryDeletes);
router.get("/getTotalpagesUploadsDeletesLast7Days", verifyToken, getTotalpagesUploadsDeletesLast7Days);

router.get("/notifications", verifyToken, last7Days);
router.post("/postAllNotifications", verifyToken, postAllNotifications);
router.post("/notification/:id", verifyToken, readNotification);
router.get("/checkIfHaveNotification", verifyToken, checkIfHaveNotification)
export default router;
