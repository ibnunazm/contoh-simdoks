"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ArchiveController = require("../controllers/ArchiveController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/archives", _VerifyToken.verifyToken, _ArchiveController.getArchives);
router.get("/archive/:id", _VerifyToken.verifyToken, _ArchiveController.getArchiveById);
router.post("/archive", _VerifyToken.verifyToken, _ArchiveController.createArchive);
router.patch("/archive/:id", _VerifyToken.verifyToken, _ArchiveController.updateArchive);
router.delete("/archive/:id", _VerifyToken.verifyToken, _ArchiveController.deleteArchive);
router.get("/getarchive/subtype", _VerifyToken.verifyToken, _ArchiveController.getArchivesBySubtypeId);
router.get("/getarchive/year", _VerifyToken.verifyToken, _ArchiveController.filterByYears);
router.get("/archives/search", _VerifyToken.verifyToken, _ArchiveController.searchArchive);
var _default = exports.default = router;