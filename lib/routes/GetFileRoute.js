"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _GetFile = require("../controllers/GetFile.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/getFile", _VerifyToken.verifyToken, _GetFile.getFile);
router.get("/getAllFilesDeletedIn7Days", _VerifyToken.verifyToken, _GetFile.getAllFilesDeletedIn7Days);
router.get("/getTotalPagesDeletedIn7Days", _VerifyToken.verifyToken, _GetFile.getTotalPagesDeletedIn7Days);
router.get("/getReminderTotalFileDeletePerDaysIn7Days", _VerifyToken.verifyToken, _GetFile.getReminderTotalFileDeletePerDaysIn7Days);
router.get("/searchFileDeletedIn7Days", _VerifyToken.verifyToken, _GetFile.searchFileDeletedIn7Days);
var _default = exports.default = router;