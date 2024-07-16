"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _CategoryModel = _interopRequireDefault(require("./CategoryModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Task = _database.default.define("tasks", {
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
  file_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
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
Task.belongsTo(_CategoryModel.default, {
  foreignKey: "categoriesId"
});
_CategoryModel.default.hasMany(Task, {
  foreignKey: "categoriesId"
});
var _default = exports.default = Task;