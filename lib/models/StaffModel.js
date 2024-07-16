"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _CategoryModel = _interopRequireDefault(require("./CategoryModel.js"));
var _StaffTypeModel = _interopRequireDefault(require("./StaffTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Staffs = _database.default.define("staffs", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  categoriesId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  typeId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  file_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  file_url: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  }
}, {
  freezeTableName: true
});
Staffs.belongsTo(_CategoryModel.default, {
  foreignKey: "categoriesId"
});
_CategoryModel.default.hasMany(Staffs, {
  foreignKey: "categoriesId"
});
Staffs.belongsTo(_StaffTypeModel.default, {
  foreignKey: "typeId"
});
_StaffTypeModel.default.hasMany(Staffs, {
  foreignKey: "typeId"
});
var _default = exports.default = Staffs;