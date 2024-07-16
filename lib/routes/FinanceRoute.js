"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _FinanceController = require("../controllers/FinanceController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/Finances", _VerifyToken.verifyToken, _FinanceController.getFinances);
router.get("/Finance/:id", _VerifyToken.verifyToken, _FinanceController.getFinanceById);
router.post("/Finance", _VerifyToken.verifyToken, _FinanceController.createFinance);
router.patch("/Finance/:id", _VerifyToken.verifyToken, _FinanceController.updateFinance);
router.delete("/Finance/:id", _VerifyToken.verifyToken, _FinanceController.deleteFinance);
router.get("/Finances/search", _VerifyToken.verifyToken, _FinanceController.searchFinance);
router.get("/Finances/filter", _VerifyToken.verifyToken, _FinanceController.filterByYears);
var _default = exports.default = router;