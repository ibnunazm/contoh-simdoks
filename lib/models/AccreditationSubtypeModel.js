"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _AccreditationTypeModel = _interopRequireDefault(require("./AccreditationTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AccreditationSubtypes = _database.default.define("accreditation_subtypes", {
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
AccreditationSubtypes.belongsTo(_AccreditationTypeModel.default, {
  foreignKey: "typeId"
});
_AccreditationTypeModel.default.hasMany(AccreditationSubtypes, {
  foreignKey: "typeId"
});
var _default = exports.default = AccreditationSubtypes;