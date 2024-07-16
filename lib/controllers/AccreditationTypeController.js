"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAccreditationType = exports.searchAccreditationType = exports.getAccreditationTypes = exports.getAccreditationTypeById = exports.deleteAccreditationType = exports.createAccreditationType = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _AccreditationTypeModel = _interopRequireDefault(require("../models/AccreditationTypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAccreditationTypes = async (req, res) => {
  try {
    const accreditationTypes = await _AccreditationTypeModel.default.findAll();
    res.status(200).json(accreditationTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getAccreditationTypes = getAccreditationTypes;
const getAccreditationTypeById = async (req, res) => {
  try {
    const accreditationType = await _AccreditationTypeModel.default.findByPk(req.params.id);
    res.status(200).json(accreditationType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getAccreditationTypeById = getAccreditationTypeById;
const createAccreditationType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _AccreditationTypeModel.default.create({
      categoriesId: 1,
      type_name: typeName
    });
    res.status(201).json("Accreditation type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createAccreditationType = createAccreditationType;
const updateAccreditationType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _AccreditationTypeModel.default.update({
      type_name: typeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Accreditation type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateAccreditationType = updateAccreditationType;
const deleteAccreditationType = async (req, res) => {
  try {
    await _AccreditationTypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Accreditation type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteAccreditationType = deleteAccreditationType;
const searchAccreditationType = async (req, res) => {
  try {
    const accreditationType = await _AccreditationTypeModel.default.findAll({
      where: {
        type_name: {
          [_sequelize.Op.like]: "%".concat(req.query.search, "%")
        }
      }
    });
    res.status(200).json(accreditationType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchAccreditationType = searchAccreditationType;