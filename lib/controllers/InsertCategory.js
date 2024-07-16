"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _CategoryModel = _interopRequireDefault(require("../models/CategoryModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertCategories = async () => {
  try {
    const existingCategories = await _CategoryModel.default.findAll();
    if (existingCategories.length === 0) {
      const categoriesToInsert = [{
        category_name: "Akreditasi",
        barcode_url: "http://localhost:3000/Accreditations",
        deletion_system: "Manual"
      }, {
        category_name: "Kepegawaian",
        barcode_url: "http://localhost:3000/kepegawaian",
        deletion_system: "Manual"
      }, {
        category_name: "Barang",
        barcode_url: "http://localhost:3000/barang",
        validity_period: 5,
        deletion_system: "Otomatis"
      }, {
        category_name: "Program",
        barcode_url: "http://localhost:3000/program",
        validity_period: 1,
        deletion_system: "Otomatis"
      }, {
        category_name: "Surat",
        barcode_url: "http://localhost:3000/surat",
        validity_period: 5,
        deletion_system: "Otomatis"
      }, {
        category_name: "Keuangan",
        barcode_url: "http://localhost:3000/keuangan",
        validity_period: 20,
        deletion_system: "Otomatis"
      }, {
        category_name: "Surat Tugas",
        barcode_url: "http://localhost:3000/tugas",
        validity_period: 5,
        deletion_system: "Otomatis"
      }];
      await _CategoryModel.default.bulkCreate(categoriesToInsert);
      console.log("Inserted categories successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting categories");
  }
};
var _default = exports.default = insertCategories;