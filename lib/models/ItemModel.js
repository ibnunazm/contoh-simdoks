"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _CategoryModel = _interopRequireDefault(require("./CategoryModel.js"));
var _ItemTypeModel = _interopRequireDefault(require("./ItemTypeModel.js"));
var _ItemSubtypeModel = _interopRequireDefault(require("./ItemSubtypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Items = _database.default.define("items", {
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
    allowNull: true
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
Items.belongsTo(_CategoryModel.default, {
  foreignKey: "categoriesId"
});
_CategoryModel.default.hasMany(Items, {
  foreignKey: "categoriesId"
});
Items.belongsTo(_ItemTypeModel.default, {
  foreignKey: "typeId"
});
_ItemTypeModel.default.hasMany(Items, {
  foreignKey: "typeId"
});
Items.belongsTo(_ItemSubtypeModel.default, {
  foreignKey: "subtypeId",
  onDelete: "SET NULL"
});
var _default = exports.default = Items;