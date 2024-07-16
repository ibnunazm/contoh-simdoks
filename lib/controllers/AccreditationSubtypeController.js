"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAccreditationSubtype = exports.searchAccreditationSubtype = exports.getAccreditationSubtypes = exports.getAccreditationSubtypeById = exports.deleteAccreditationSubtype = exports.createAccreditationSubtype = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _AccreditationSubtypeModel = _interopRequireDefault(require("../models/AccreditationSubtypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAccreditationSubtypes = async (req, res) => {
  try {
    const accreditationSubtypes = await _AccreditationSubtypeModel.default.findAll();
    res.status(200).json(accreditationSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getAccreditationSubtypes = getAccreditationSubtypes;
const getAccreditationSubtypeById = async (req, res) => {
  try {
    const accreditationSubtype = await _AccreditationSubtypeModel.default.findByPk(req.params.id);
    res.status(200).json(accreditationSubtype);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getAccreditationSubtypeById = getAccreditationSubtypeById;
const createAccreditationSubtype = async (req, res) => {
  try {
    const {
      typeId,
      subtypeName
    } = req.body;
    await _AccreditationSubtypeModel.default.create({
      typeId: typeId,
      subtype_name: subtypeName
    });
    res.status(201).json("Accreditation subtype berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createAccreditationSubtype = createAccreditationSubtype;
const updateAccreditationSubtype = async (req, res) => {
  try {
    const {
      typeId,
      subtypeName
    } = req.body;
    await _AccreditationSubtypeModel.default.update({
      typeId: typeId,
      subtype_name: subtypeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Accreditation subtype berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateAccreditationSubtype = updateAccreditationSubtype;
const deleteAccreditationSubtype = async (req, res) => {
  try {
    await _AccreditationSubtypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Accreditation subtype berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteAccreditationSubtype = deleteAccreditationSubtype;
const searchAccreditationSubtype = async (req, res) => {
  try {
    const accreditationSubtype = await _AccreditationSubtypeModel.default.findAll({
      where: {
        typeId: req.query.typeId,
        subtype_name: {
          [_sequelize.Op.like]: "%".concat(req.query.search, "%")
        }
      }
    });
    res.status(200).json(accreditationSubtype);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchAccreditationSubtype = searchAccreditationSubtype;