"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _ArchiveTypeModel = _interopRequireDefault(require("./ArchiveTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ArchiveSubtypes = _database.default.define("archive_subtypes", {
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
ArchiveSubtypes.belongsTo(_ArchiveTypeModel.default, {
  foreignKey: "typeId"
});
_ArchiveTypeModel.default.hasMany(ArchiveSubtypes, {
  foreignKey: "typeId"
});
var _default = exports.default = ArchiveSubtypes;