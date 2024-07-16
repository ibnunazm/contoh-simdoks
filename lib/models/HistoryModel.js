"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _UserModel = _interopRequireDefault(require("./UserModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const History = _database.default.define("history", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  file_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  action: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  expired_date: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  deletion_system: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  isRead: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});
var _default = exports.default = History;