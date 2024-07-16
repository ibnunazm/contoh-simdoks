"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Categories = _database.default.define("categories", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  barcode_url: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  file_total: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  validity_period: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  deletion_system: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
});
var _default = exports.default = Categories;