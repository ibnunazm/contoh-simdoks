"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _CategoryModel = _interopRequireDefault(require("./CategoryModel.js"));
var _ProgramTypeModel = _interopRequireDefault(require("./ProgramTypeModel.js"));
var _ProgramSubtypeModel = _interopRequireDefault(require("./ProgramSubtypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Programs = _database.default.define("programs", {
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
  subtypeId: {
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
  },
  end_date: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  }
}, {
  freezeTableName: true
});
Programs.belongsTo(_CategoryModel.default, {
  foreignKey: "categoriesId"
});
_CategoryModel.default.hasMany(Programs, {
  foreignKey: "categoriesId"
});
Programs.belongsTo(_ProgramTypeModel.default, {
  foreignKey: "typeId"
});
_ProgramTypeModel.default.hasMany(Programs, {
  foreignKey: "typeId"
});
Programs.belongsTo(_ProgramSubtypeModel.default, {
  foreignKey: "subtypeId"
});
_ProgramSubtypeModel.default.hasMany(Programs, {
  foreignKey: "subtypeId"
});
var _default = exports.default = Programs;