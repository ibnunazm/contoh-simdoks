"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemSubtype = exports.searchItemSubtype = exports.getItemSubtypes = exports.getItemSubtypeById = exports.deleteItemSubtype = exports.createItemSubtype = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _ItemSubtypeModel = _interopRequireDefault(require("../models/ItemSubtypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getItemSubtypes = async (req, res) => {
  try {
    const itemSubtypes = await _ItemSubtypeModel.default.findAll();
    res.status(200).json(itemSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getItemSubtypes = getItemSubtypes;
const getItemSubtypeById = async (req, res) => {
  try {
    const itemSubtype = await _ItemSubtypeModel.default.findByPk(req.params.id);
    res.status(200).json(itemSubtype);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getItemSubtypeById = getItemSubtypeById;
const createItemSubtype = async (req, res) => {
  try {
    const {
      typeId,
      subtypeName
    } = req.body;
    await _ItemSubtypeModel.default.create({
      typeId: typeId,
      subtype_name: subtypeName
    });
    res.status(201).json("Item subtype berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createItemSubtype = createItemSubtype;
const updateItemSubtype = async (req, res) => {
  try {
    const {
      typeId,
      subtypeName
    } = req.body;
    await _ItemSubtypeModel.default.update({
      typeId: typeId,
      subtype_name: subtypeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Item subtype berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateItemSubtype = updateItemSubtype;
const deleteItemSubtype = async (req, res) => {
  try {
    await _ItemSubtypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Item subtype berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteItemSubtype = deleteItemSubtype;
const searchItemSubtype = async (req, res) => {
  try {
    const {
      search
    } = req.query;
    const itemSubtypes = await _ItemSubtypeModel.default.findAll({
      where: {
        subtype_name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      }
    });
    res.status(200).json(itemSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchItemSubtype = searchItemSubtype;