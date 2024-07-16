"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArchiveType = exports.searchArchiveType = exports.getArchiveTypes = exports.getArchiveTypeById = exports.deleteArchiveType = exports.createArchiveType = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _ArchiveTypeModel = _interopRequireDefault(require("../models/ArchiveTypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getArchiveTypes = async (req, res) => {
  try {
    const archiveTypes = await _ArchiveTypeModel.default.findAll();
    res.status(200).json(archiveTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getArchiveTypes = getArchiveTypes;
const getArchiveTypeById = async (req, res) => {
  try {
    const archiveType = await _ArchiveTypeModel.default.findByPk(req.params.id);
    res.status(200).json(archiveType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getArchiveTypeById = getArchiveTypeById;
const createArchiveType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _ArchiveTypeModel.default.create({
      categoriesId: 5,
      type_name: typeName
    });
    res.status(201).json("Archive type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createArchiveType = createArchiveType;
const updateArchiveType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _ArchiveTypeModel.default.update({
      type_name: typeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Archive type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateArchiveType = updateArchiveType;
const deleteArchiveType = async (req, res) => {
  try {
    await _ArchiveTypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Archive type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteArchiveType = deleteArchiveType;
const searchArchiveType = async (req, res) => {
  try {
    const {
      search
    } = req.query;
    const archiveTypes = await _ArchiveTypeModel.default.findAll({
      where: {
        type_name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      }
    });
    res.status(200).json(archiveTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchArchiveType = searchArchiveType;