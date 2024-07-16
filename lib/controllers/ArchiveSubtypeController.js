"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArchiveSubtype = exports.searchArchiveSubtype = exports.getArchiveSubtypes = exports.getArchiveSubtypeById = exports.deleteArchiveSubtype = exports.createArchiveSubtype = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _ArchiveSubtypeModel = _interopRequireDefault(require("../models/ArchiveSubtypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getArchiveSubtypes = async (req, res) => {
  try {
    const archiveSubtypes = await _ArchiveSubtypeModel.default.findAll();
    res.status(200).json(archiveSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getArchiveSubtypes = getArchiveSubtypes;
const getArchiveSubtypeById = async (req, res) => {
  try {
    const archiveSubtype = await _ArchiveSubtypeModel.default.findByPk(req.params.id);
    res.status(200).json(archiveSubtype);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getArchiveSubtypeById = getArchiveSubtypeById;
const createArchiveSubtype = async (req, res) => {
  try {
    const {
      typeId,
      subtypeName
    } = req.body;
    await _ArchiveSubtypeModel.default.create({
      typeId: typeId,
      subtype_name: subtypeName
    });
    res.status(201).json("Archive subtype berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createArchiveSubtype = createArchiveSubtype;
const updateArchiveSubtype = async (req, res) => {
  try {
    const {
      typeId,
      subtypeName
    } = req.body;
    await _ArchiveSubtypeModel.default.update({
      typeId: typeId,
      subtype_name: subtypeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Archive subtype berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateArchiveSubtype = updateArchiveSubtype;
const deleteArchiveSubtype = async (req, res) => {
  try {
    await _ArchiveSubtypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Archive subtype berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteArchiveSubtype = deleteArchiveSubtype;
const searchArchiveSubtype = async (req, res) => {
  try {
    const {
      search
    } = req.query;
    const archiveSubtypes = await _ArchiveSubtypeModel.default.findAll({
      where: {
        subtype_name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      }
    });
    res.status(200).json(archiveSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchArchiveSubtype = searchArchiveSubtype;