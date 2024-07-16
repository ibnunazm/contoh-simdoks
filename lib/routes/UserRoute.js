"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _UserController = require("../controllers/UserController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
var _RefreshToken = require("../controllers/RefreshToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/users", _VerifyToken.verifyToken, _UserController.getUsers);
router.get("/users/:id", _VerifyToken.verifyToken, _UserController.getUserById);
router.post("/users", _UserController.register);
router.post("/login", _UserController.login);
router.get("/token", _RefreshToken.refreshToken);
router.get("/me", _UserController.getUserLogin);
router.delete("/logout", _UserController.logout);
var _default = exports.default = router;