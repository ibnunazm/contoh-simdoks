"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemType = exports.searchItemType = exports.getItemTypes = exports.getItemTypeById = exports.deleteItemType = exports.createItemType = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _ItemTypeModel = _interopRequireDefault(require("../models/ItemTypeModel.js"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getItemTypes = async (req, res) => {
  try {
    const itemTypes = await _ItemTypeModel.default.findAll();
    res.status(200).json(itemTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getItemTypes = getItemTypes;
const getItemTypeById = async (req, res) => {
  try {
    const itemType = await _ItemTypeModel.default.findByPk(req.params.id);
    res.status(200).json(itemType);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getItemTypeById = getItemTypeById;
const createItemType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _ItemTypeModel.default.create({
      categoriesId: 3,
      type_name: typeName
    });
    res.status(201).json("Item type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createItemType = createItemType;
const updateItemType = async (req, res) => {
  try {
    const {
      typeName
    } = req.body;
    await _ItemTypeModel.default.update({
      categoriesId: 3,
      type_name: typeName
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Item type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateItemType = updateItemType;
const deleteItemType = async (req, res) => {
  try {
    await _ItemTypeModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Item type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteItemType = deleteItemType;
const searchItemType = async (req, res) => {
  try {
    const {
      search
    } = req.query;
    const itemTypes = await _ItemTypeModel.default.findAll({
      where: {
        type_name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      }
    });
    res.status(200).json(itemTypes);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchItemType = searchItemType;