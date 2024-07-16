"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProgramSubtype = exports.searchProgramSubtype = exports.getProgramSubtypes = exports.getProgramSubtypeById = exports.deleteProgramSubtype = exports.createProgramSubtype = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _ProgramSubtypeModel = _interopRequireDefault(require("../models/ProgramSubtypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getProgramSubtypes = async (req, res) => {
  try {
    const programSubtypes = await _ProgramSubtypeModel.default.findAll();
    res.status(200).json(programSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getProgramSubtypes = getProgramSubtypes;
const getProgramSubtypeById = async (req, res) => {
  try {
    const programSubtype = await _ProgramSubtypeModel.default.findByPk(req.params.id);
    res.status(200).json(programSubtype);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getProgramSubtypeById = getProgramSubtypeById;
const createProgramSubtype = async (req, res) => {
  try {
    const {
      typeId,
      subtypeName
    } = req.body;
    await _ProgramSubtypeModel.default.create({
      typeId: typeId,
      subtype_name: subtypeName
    });
    res.status(201).json("Program subtype berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createProgramSubtype = createProgramSubtype;
const updateProgramSubtype = async (req, res) => {
  try {
    const {
      typeId,
      subtypeName
    } = req.body;
    await _ProgramSubtypeModel.default.update({
      typeId: typeId,
      subtype_name: subtypeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Program subtype berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateProgramSubtype = updateProgramSubtype;
const deleteProgramSubtype = async (req, res) => {
  try {
    await _ProgramSubtypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Program subtype berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteProgramSubtype = deleteProgramSubtype;
const searchProgramSubtype = async (req, res) => {
  try {
    const programSubtype = await _ProgramSubtypeModel.default.findAll({
      where: {
        typeId: req.query.typeId,
        subtype_name: {
          [_sequelize.Op.like]: "%".concat(req.query.search, "%")
        }
      }
    });
    res.status(200).json(programSubtype);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchProgramSubtype = searchProgramSubtype;