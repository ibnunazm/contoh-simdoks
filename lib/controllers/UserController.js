"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.logout = exports.login = exports.getUsers = exports.getUserLogin = exports.getUserById = void 0;
require("core-js/modules/es.promise.js");
var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getUsers = async (req, res) => {
  try {
    const users = await _UserModel.default.findAll({
      attributes: ["id", "username", "role"]
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
  try {
    const user = await _UserModel.default.findByPk(req.params.id, {
      attributes: ["id", "username", "role"]
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getUserById = getUserById;
const register = async (req, res) => {
  try {
    const {
      username,
      password,
      role
    } = req.body;
    const salt = await _bcrypt.default.genSalt();
    const hashedPassword = await _bcrypt.default.hash(password, salt);
    await _UserModel.default.create({
      username: username,
      password: hashedPassword,
      role: role
    });
    res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.register = register;
const login = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await _UserModel.default.findOne({
      where: {
        username: username
      }
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const isPasswordCorrect = await _bcrypt.default.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }
    const accessToken = _jsonwebtoken.default.sign({
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d"
    });
    const refreshToken = _jsonwebtoken.default.sign({
      username: user.username,
      role: user.role
    }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d"
    });
    await _UserModel.default.update({
      refresh_token: refreshToken
    }, {
      where: {
        username: username
      }
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/"
    });
    res.status(200).json({
      id: user.id,
      username,
      password,
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.login = login;
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await _UserModel.default.update({
      refreshToken: null
    }, {
      where: {
        refreshToken: refreshToken
      }
    });
    res.clearCookie("refreshToken");
    res.status(200).json({
      message: "Logout successfully"
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.logout = logout;
const getUserLogin = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const decodedToken = _jsonwebtoken.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await _UserModel.default.findOne({
      where: {
        username: decodedToken.username
      },
      attributes: ["id", "username", "role"]
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
};
exports.getUserLogin = getUserLogin;