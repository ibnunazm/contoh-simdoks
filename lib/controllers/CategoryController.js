"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.deleteCategory = exports.createCategory = void 0;
require("core-js/modules/es.promise.js");
var _CategoryModel = _interopRequireDefault(require("../models/CategoryModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getCategories = async (req, res) => {
  try {
    const categories = await _CategoryModel.default.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getCategories = getCategories;
const getCategoryById = async (req, res) => {
  try {
    const category = await _CategoryModel.default.findByPk(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
  try {
    await _CategoryModel.default.create(req.body);
    res.status(201).json({
      message: "Category created successfully"
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
  try {
    await _CategoryModel.default.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      message: "Category updated successfully"
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
  try {
    await _CategoryModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteCategory = deleteCategory;