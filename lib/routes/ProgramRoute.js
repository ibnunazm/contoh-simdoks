"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ProgramController = require("../controllers/ProgramController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/Programs", _VerifyToken.verifyToken, _ProgramController.getPrograms);
router.get("/Program/:id", _VerifyToken.verifyToken, _ProgramController.getProgramById);
router.post("/Program", _VerifyToken.verifyToken, _ProgramController.createProgram);
router.patch("/Program/:id", _VerifyToken.verifyToken, _ProgramController.updateProgram);
router.delete("/Program/:id", _VerifyToken.verifyToken, _ProgramController.deleteProgram);
router.get("/Programs/search", _VerifyToken.verifyToken, _ProgramController.searchProgram);
router.get("/Programs/filter", _VerifyToken.verifyToken, _ProgramController.filterByYears);
var _default = exports.default = router;