"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _AccreditationTypeController = require("../controllers/AccreditationTypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/accreditationTypes", _VerifyToken.verifyToken, _AccreditationTypeController.getAccreditationTypes);
router.get("/accreditationType/:id", _VerifyToken.verifyToken, _AccreditationTypeController.getAccreditationTypeById);
router.post("/accreditationType", _VerifyToken.verifyToken, _AccreditationTypeController.createAccreditationType);
router.patch("/accreditationType/:id", _VerifyToken.verifyToken, _AccreditationTypeController.updateAccreditationType);
router.delete("/accreditationType/:id", _VerifyToken.verifyToken, _AccreditationTypeController.deleteAccreditationType);
router.get("/accreditationTypes/search", _VerifyToken.verifyToken, _AccreditationTypeController.searchAccreditationType);
var _default = exports.default = router;