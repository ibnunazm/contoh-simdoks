"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ProgramSubtypeController = require("../controllers/ProgramSubtypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/programSubtypes", _VerifyToken.verifyToken, _ProgramSubtypeController.getProgramSubtypes);
router.get("/programSubtype/:id", _VerifyToken.verifyToken, _ProgramSubtypeController.getProgramSubtypeById);
router.post("/programSubtype", _VerifyToken.verifyToken, _ProgramSubtypeController.createProgramSubtype);
router.patch("/programSubtype/:id", _VerifyToken.verifyToken, _ProgramSubtypeController.updateProgramSubtype);
router.delete("/programSubtype/:id", _VerifyToken.verifyToken, _ProgramSubtypeController.deleteProgramSubtype);
router.get("/programSubtypes/search", _VerifyToken.verifyToken, _ProgramSubtypeController.searchProgramSubtype);
var _default = exports.default = router;