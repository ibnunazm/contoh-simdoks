"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ItemController = require("../controllers/ItemController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/Items", _VerifyToken.verifyToken, _ItemController.getItems);
router.get("/Item/:id", _VerifyToken.verifyToken, _ItemController.getItemById);
router.post("/Item", _VerifyToken.verifyToken, _ItemController.createItem);
router.patch("/Item/:id", _VerifyToken.verifyToken, _ItemController.updateItem);
router.delete("/Item/:id", _VerifyToken.verifyToken, _ItemController.deleteItem);
router.get("/getItem/subtype", _VerifyToken.verifyToken, _ItemController.getItemsBySubtypeId);
router.get("/getItem/year", _VerifyToken.verifyToken, _ItemController.filterByYears);
router.get("/Items/search", _VerifyToken.verifyToken, _ItemController.searchItem);
var _default = exports.default = router;