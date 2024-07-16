"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _CategoryModel = _interopRequireDefault(require("./CategoryModel.js"));
var _AccreditationTypeModel = _interopRequireDefault(require("./AccreditationTypeModel.js"));
var _AccreditationSubtypeModel = _interopRequireDefault(require("./AccreditationSubtypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Accreditations = _database.default.define("accreditations", {
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
  }
}, {
  freezeTableName: true
});
Accreditations.belongsTo(_CategoryModel.default, {
  foreignKey: "categoriesId"
});
_CategoryModel.default.hasMany(Accreditations, {
  foreignKey: "categoriesId"
});
Accreditations.belongsTo(_AccreditationTypeModel.default, {
  foreignKey: "typeId"
});
_AccreditationTypeModel.default.hasMany(Accreditations, {
  foreignKey: "typeId"
});
Accreditations.belongsTo(_AccreditationSubtypeModel.default, {
  foreignKey: "subtypeId"
});
_AccreditationSubtypeModel.default.hasMany(Accreditations, {
  foreignKey: "subtypeId"
});
var _default = exports.default = Accreditations;