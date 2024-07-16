"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ArchiveTypeController = require("../controllers/ArchiveTypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/archiveTypes", _VerifyToken.verifyToken, _ArchiveTypeController.getArchiveTypes);
router.get("/archiveType/:id", _VerifyToken.verifyToken, _ArchiveTypeController.getArchiveTypeById);
router.post("/archiveType", _VerifyToken.verifyToken, _ArchiveTypeController.createArchiveType);
router.patch("/archiveType/:id", _VerifyToken.verifyToken, _ArchiveTypeController.updateArchiveType);
router.delete("/archiveType/:id", _VerifyToken.verifyToken, _ArchiveTypeController.deleteArchiveType);
router.get("/archiveTypes/search", _VerifyToken.verifyToken, _ArchiveTypeController.searchArchiveType);
var _default = exports.default = router;