"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProgramType = exports.searchProgramType = exports.getProgramTypes = exports.getProgramTypeById = exports.deleteProgramType = exports.createProgramType = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _ProgramTypeModel = _interopRequireDefault(require("../models/ProgramTypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getProgramTypes = async (req, res) => {
  try {
    const programTypes = await _ProgramTypeModel.default.findAll();
    res.status(200).json(programTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getProgramTypes = getProgramTypes;
const getProgramTypeById = async (req, res) => {
  try {
    const programType = await _ProgramTypeModel.default.findByPk(req.params.id);
    res.status(200).json(programType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getProgramTypeById = getProgramTypeById;
const createProgramType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _ProgramTypeModel.default.create({
      categoriesId: 4,
      type_name: typeName
    });
    res.status(201).json("Program type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createProgramType = createProgramType;
const updateProgramType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _ProgramTypeModel.default.update({
      type_name: typeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Program type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateProgramType = updateProgramType;
const deleteProgramType = async (req, res) => {
  try {
    await _ProgramTypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Program type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteProgramType = deleteProgramType;
const searchProgramType = async (req, res) => {
  try {
    const programType = await _ProgramTypeModel.default.findAll({
      where: {
        type_name: {
          [_sequelize.Op.like]: "%".concat(req.query.search, "%")
        }
      }
    });
    res.status(200).json(programType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchProgramType = searchProgramType;