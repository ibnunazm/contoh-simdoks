"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFinanceType = exports.searchFinanceType = exports.getFinanceTypes = exports.getFinanceTypeById = exports.deleteFinanceType = exports.createFinanceType = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _FinanceTypeModel = _interopRequireDefault(require("../models/FinanceTypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getFinanceTypes = async (req, res) => {
  try {
    const financeTypes = await _FinanceTypeModel.default.findAll();
    res.status(200).json(financeTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getFinanceTypes = getFinanceTypes;
const getFinanceTypeById = async (req, res) => {
  try {
    const financeType = await _FinanceTypeModel.default.findByPk(req.params.id);
    res.status(200).json(financeType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getFinanceTypeById = getFinanceTypeById;
const createFinanceType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _FinanceTypeModel.default.create({
      categoriesId: 6,
      type_name: typeName
    });
    res.status(201).json("Finance type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createFinanceType = createFinanceType;
const updateFinanceType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _FinanceTypeModel.default.update({
      type_name: typeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Finance type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateFinanceType = updateFinanceType;
const deleteFinanceType = async (req, res) => {
  try {
    await _FinanceTypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Finance type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteFinanceType = deleteFinanceType;
const searchFinanceType = async (req, res) => {
  try {
    const {
      search
    } = req.query;
    const financeTypes = await _FinanceTypeModel.default.findAll({
      where: {
        type_name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      }
    });
    res.status(200).json(financeTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchFinanceType = searchFinanceType;