"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ItemSubtypeController = require("../controllers/ItemSubtypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/itemSubtypes", _VerifyToken.verifyToken, _ItemSubtypeController.getItemSubtypes);
router.get("/itemSubtype/:id", _VerifyToken.verifyToken, _ItemSubtypeController.getItemSubtypeById);
router.post("/itemSubtype", _VerifyToken.verifyToken, _ItemSubtypeController.createItemSubtype);
router.patch("/itemSubtype/:id", _VerifyToken.verifyToken, _ItemSubtypeController.updateItemSubtype);
router.delete("/itemSubtype/:id", _VerifyToken.verifyToken, _ItemSubtypeController.deleteItemSubtype);
router.get("/itemSubtypes/search", _VerifyToken.verifyToken, _ItemSubtypeController.searchItemSubtype);
var _default = exports.default = router;