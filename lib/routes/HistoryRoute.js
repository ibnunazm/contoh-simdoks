"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _HistoryController = require("../controllers/HistoryController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/historyUploads", _VerifyToken.verifyToken, _HistoryController.getHistoryUploads);
router.get("/historyDeletes", _VerifyToken.verifyToken, _HistoryController.getHistoryDelete);
router.get("/historyUpload", _VerifyToken.verifyToken, _HistoryController.paginationHistoryUpload);
router.get("/historyDelete", _VerifyToken.verifyToken, _HistoryController.paginationHistoryDelete);
router.get("/last7DaysUploads", _VerifyToken.verifyToken, _HistoryController.last7DaysUploads);
router.get("/last7DaysDeletes", _VerifyToken.verifyToken, _HistoryController.last7DaysDeletes);
router.get("/totalPages", _VerifyToken.verifyToken, _HistoryController.getTotalpages);
router.get("/searchHistoryUploads", _VerifyToken.verifyToken, _HistoryController.searchHistoryUploads);
router.get("/searchHistoryDeletes", _VerifyToken.verifyToken, _HistoryController.searchHistoryDeletes);
router.get("/getTotalpagesUploadsDeletesLast7Days", _VerifyToken.verifyToken, _HistoryController.getTotalpagesUploadsDeletesLast7Days);
router.get("/notifications", _VerifyToken.verifyToken, _HistoryController.last7Days);
router.post("/postAllNotifications", _VerifyToken.verifyToken, _HistoryController.postAllNotifications);
router.post("/notification/:id", _VerifyToken.verifyToken, _HistoryController.readNotification);
router.get("/checkIfHaveNotification", _VerifyToken.verifyToken, _HistoryController.checkIfHaveNotification);
var _default = exports.default = router;