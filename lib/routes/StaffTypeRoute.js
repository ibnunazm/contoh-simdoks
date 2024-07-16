"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _StaffTypeController = require("../controllers/StaffTypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/staffTypes", _VerifyToken.verifyToken, _StaffTypeController.getStaffTypes);
router.get("/staffType/:id", _VerifyToken.verifyToken, _StaffTypeController.getStaffTypeById);
router.post("/staffType", _VerifyToken.verifyToken, _StaffTypeController.createStaffType);
router.patch("/staffType/:id", _VerifyToken.verifyToken, _StaffTypeController.updateStaffType);
router.delete("/staffType/:id", _VerifyToken.verifyToken, _StaffTypeController.deleteStaffType);
router.get("/staffTypes/search", _VerifyToken.verifyToken, _StaffTypeController.searchStaffType);
var _default = exports.default = router;