"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ArchiveSubtypeController = require("../controllers/ArchiveSubtypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/archiveSubtypes", _VerifyToken.verifyToken, _ArchiveSubtypeController.getArchiveSubtypes);
router.get("/archiveSubtype/:id", _VerifyToken.verifyToken, _ArchiveSubtypeController.getArchiveSubtypeById);
router.post("/archiveSubtype", _VerifyToken.verifyToken, _ArchiveSubtypeController.createArchiveSubtype);
router.patch("/archiveSubtype/:id", _VerifyToken.verifyToken, _ArchiveSubtypeController.updateArchiveSubtype);
router.delete("/archiveSubtype/:id", _VerifyToken.verifyToken, _ArchiveSubtypeController.deleteArchiveSubtype);
router.get("/archiveSubtypes/search", _VerifyToken.verifyToken, _ArchiveSubtypeController.searchArchiveSubtype);
var _default = exports.default = router;