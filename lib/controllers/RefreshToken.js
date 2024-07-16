"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshToken = void 0;
require("core-js/modules/es.promise.js");
var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({
        message: "Refresh token not found"
      });
    }
    _jsonwebtoken.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid refresh token"
        });
      }
      const user = await _UserModel.default.findOne({
        where: {
          username: decoded.username
        }
      });
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      const accessToken = _jsonwebtoken.default.sign({
        username: user.username,
        role: user.role
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m"
      });
      res.status(200).json({
        accessToken: accessToken
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.refreshToken = refreshToken;