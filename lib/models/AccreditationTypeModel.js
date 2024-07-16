"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _CategoryModel = _interopRequireDefault(require("./CategoryModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AccreditationTypes = _database.default.define("accreditation_types", {
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
  type_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});
AccreditationTypes.belongsTo(_CategoryModel.default, {
  foreignKey: "categoriesId"
});
_CategoryModel.default.hasMany(AccreditationTypes, {
  foreignKey: "categoriesId"
});
var _default = exports.default = AccreditationTypes;