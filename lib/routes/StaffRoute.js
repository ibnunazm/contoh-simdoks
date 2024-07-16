"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _StaffController = require("../controllers/StaffController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/Staffs', _VerifyToken.verifyToken, _StaffController.getStaffs);
router.get('/Staff/:id', _VerifyToken.verifyToken, _StaffController.getStaffById);
router.post('/Staff', _VerifyToken.verifyToken, _StaffController.createStaff);
router.patch('/Staff/:id', _VerifyToken.verifyToken, _StaffController.updateStaff);
router.delete('/Staff/:id', _VerifyToken.verifyToken, _StaffController.deleteStaff);
router.get('/Staffs/search', _VerifyToken.verifyToken, _StaffController.searchStaff);
router.get('/Staffs/filter', _VerifyToken.verifyToken, _StaffController.filterByYears);
var _default = exports.default = router;