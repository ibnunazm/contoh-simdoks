"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _AccreditationSubtypeController = require("../controllers/AccreditationSubtypeController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/accreditationSubtypes", _VerifyToken.verifyToken, _AccreditationSubtypeController.getAccreditationSubtypes);
router.get("/accreditationSubtype/:id", _VerifyToken.verifyToken, _AccreditationSubtypeController.getAccreditationSubtypeById);
router.post("/accreditationSubtype", _VerifyToken.verifyToken, _AccreditationSubtypeController.createAccreditationSubtype);
router.patch("/accreditationSubtype/:id", _VerifyToken.verifyToken, _AccreditationSubtypeController.updateAccreditationSubtype);
router.delete("/accreditationSubtype/:id", _VerifyToken.verifyToken, _AccreditationSubtypeController.deleteAccreditationSubtype);
router.get("/accreditationSubtypes/search", _VerifyToken.verifyToken, _AccreditationSubtypeController.searchAccreditationSubtype);
var _default = exports.default = router;