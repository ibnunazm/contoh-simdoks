"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _FinanceTypeController = require("../controllers/FinanceTypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/financeTypes", _VerifyToken.verifyToken, _FinanceTypeController.getFinanceTypes);
router.get("/financeType/:id", _VerifyToken.verifyToken, _FinanceTypeController.getFinanceTypeById);
router.post("/financeType", _VerifyToken.verifyToken, _FinanceTypeController.createFinanceType);
router.patch("/financeType/:id", _VerifyToken.verifyToken, _FinanceTypeController.updateFinanceType);
router.delete("/financeType/:id", _VerifyToken.verifyToken, _FinanceTypeController.deleteFinanceType);
router.get("/financeTypes/search", _VerifyToken.verifyToken, _FinanceTypeController.searchFinanceType);
var _default = exports.default = router;