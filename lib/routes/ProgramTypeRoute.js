"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ProgramTypeController = require("../controllers/ProgramTypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/programTypes", _VerifyToken.verifyToken, _ProgramTypeController.getProgramTypes);
router.get("/programType/:id", _VerifyToken.verifyToken, _ProgramTypeController.getProgramTypeById);
router.post("/programType", _VerifyToken.verifyToken, _ProgramTypeController.createProgramType);
router.patch("/programType/:id", _VerifyToken.verifyToken, _ProgramTypeController.updateProgramType);
router.delete("/programType/:id", _VerifyToken.verifyToken, _ProgramTypeController.deleteProgramType);
router.get("/programTypes/search", _VerifyToken.verifyToken, _ProgramTypeController.searchProgramType);
var _default = exports.default = router;