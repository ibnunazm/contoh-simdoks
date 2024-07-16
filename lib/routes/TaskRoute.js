"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _TaskController = require("../controllers/TaskController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/tasks', _VerifyToken.verifyToken, _TaskController.getTasks);
router.get('/task/:id', _VerifyToken.verifyToken, _TaskController.getTaskById);
router.post('/task', _VerifyToken.verifyToken, _TaskController.createTask);
router.patch('/task/:id', _VerifyToken.verifyToken, _TaskController.updateTask);
router.delete('/task/:id', _VerifyToken.verifyToken, _TaskController.deleteTask);
router.get('/tasks/search', _VerifyToken.verifyToken, _TaskController.searchTask);
router.get('/tasks/filter', _VerifyToken.verifyToken, _TaskController.filterByYears);
var _default = exports.default = router;