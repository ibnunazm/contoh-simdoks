"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: "Access denied"
    });
  }
  _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token"
      });
    }
    req.username = decoded.username;
    next();
  });
};
exports.verifyToken = verifyToken;