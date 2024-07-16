"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _AccreditationController = require("../controllers/AccreditationController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/Accreditations", _VerifyToken.verifyToken, _AccreditationController.getAccreditations);
router.get("/Accreditation/:id", _VerifyToken.verifyToken, _AccreditationController.getAccreditationById);
router.post("/Accreditation", _VerifyToken.verifyToken, _AccreditationController.createAccreditation);
router.patch("/Accreditation/:id", _VerifyToken.verifyToken, _AccreditationController.updateAccreditation);
router.delete("/Accreditation/:id", _VerifyToken.verifyToken, _AccreditationController.deleteAccreditation);
router.get("/Accreditations/search", _VerifyToken.verifyToken, _AccreditationController.searchAccreditation);
router.get("/Accreditations/filter", _VerifyToken.verifyToken, _AccreditationController.filterByYears);
var _default = exports.default = router;