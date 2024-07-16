"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStaffType = exports.searchStaffType = exports.getStaffTypes = exports.getStaffTypeById = exports.deleteStaffType = exports.createStaffType = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _StaffTypeModel = _interopRequireDefault(require("../models/StaffTypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getStaffTypes = async (req, res) => {
  try {
    const staffTypes = await _StaffTypeModel.default.findAll();
    res.status(200).json(staffTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getStaffTypes = getStaffTypes;
const getStaffTypeById = async (req, res) => {
  try {
    const staffType = await _StaffTypeModel.default.findByPk(req.params.id);
    res.status(200).json(staffType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getStaffTypeById = getStaffTypeById;
const createStaffType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _StaffTypeModel.default.create({
      categoriesId: 2,
      type_name: typeName
    });
    res.status(201).json("Staff type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createStaffType = createStaffType;
const updateStaffType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _StaffTypeModel.default.update({
      type_name: typeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Staff type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateStaffType = updateStaffType;
const deleteStaffType = async (req, res) => {
  try {
    await _StaffTypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Staff type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteStaffType = deleteStaffType;
const searchStaffType = async (req, res) => {
  try {
    const staffType = await _StaffTypeModel.default.findAll({
      where: {
        type_name: {
          [_sequelize.Op.like]: "%".concat(req.query.search, "%")
        }
      }
    });
    res.status(200).json(staffType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchStaffType = searchStaffType;