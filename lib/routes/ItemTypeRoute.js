"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ItemTypeController = require("../controllers/ItemTypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/itemTypes", _VerifyToken.verifyToken, _ItemTypeController.getItemTypes);
router.get("/itemType/:id", _VerifyToken.verifyToken, _ItemTypeController.getItemTypeById);
router.post("/itemType", _VerifyToken.verifyToken, _ItemTypeController.createItemType);
router.patch("/itemType/:id", _VerifyToken.verifyToken, _ItemTypeController.updateItemType);
router.delete("/itemType/:id", _VerifyToken.verifyToken, _ItemTypeController.deleteItemType);
router.get("/itemTypes/search", _VerifyToken.verifyToken, _ItemTypeController.searchItemType);
var _default = exports.default = router;