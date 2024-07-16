"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _CategoryController = require("../controllers/CategoryController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/categories", _VerifyToken.verifyToken, _CategoryController.getCategories);
router.get("/categories/:id", _VerifyToken.verifyToken, _CategoryController.getCategoryById);
router.post("/categories", _VerifyToken.verifyToken, _CategoryController.createCategory);
router.patch("/categories/:id", _VerifyToken.verifyToken, _CategoryController.updateCategory);
router.delete("/categories/:id", _VerifyToken.verifyToken, _CategoryController.deleteCategory);
var _default = exports.default = router;