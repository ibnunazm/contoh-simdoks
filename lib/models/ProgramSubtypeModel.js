"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _ProgramTypeModel = _interopRequireDefault(require("./ProgramTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ProgramSubtypes = _database.default.define("program_subtypes", {
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
ProgramSubtypes.belongsTo(_ProgramTypeModel.default, {
  foreignKey: "typeId"
});
_ProgramTypeModel.default.hasMany(ProgramSubtypes, {
  foreignKey: "typeId"
});
var _default = exports.default = ProgramSubtypes;