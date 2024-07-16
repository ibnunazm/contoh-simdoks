"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _ItemTypeModel = _interopRequireDefault(require("./ItemTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ItemSubtypes = _database.default.define("item_subtypes", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  typeId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  subtype_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});
ItemSubtypes.belongsTo(_ItemTypeModel.default, {
  foreignKey: "typeId"
});
_ItemTypeModel.default.hasMany(ItemSubtypes, {
  foreignKey: "typeId"
});
var _default = exports.default = ItemSubtypes;