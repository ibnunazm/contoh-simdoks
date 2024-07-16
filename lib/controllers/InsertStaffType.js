"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _StaffTypeModel = _interopRequireDefault(require("../models/StaffTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertStaffTypes = async () => {
  try {
    const existingStaffTypes = await _StaffTypeModel.default.findAll();
    if (existingStaffTypes.length === 0) {
      const StaffTypesToInsert = [{
        categoriesId: 2,
        type_name: "Pimpinan"
      }, {
        categoriesId: 2,
        type_name: "Dokter"
      }, {
        categoriesId: 2,
        type_name: "Perawat"
      }, {
        categoriesId: 2,
        type_name: "Bidan"
      }, {
        categoriesId: 2,
        type_name: "Paramedis"
      }, {
        categoriesId: 2,
        type_name: "Administrasi"
      }, {
        categoriesId: 2,
        type_name: "Non Medis"
      }];
      await _StaffTypeModel.default.bulkCreate(StaffTypesToInsert);
      console.log("Inserted StaffTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting StaffTypes");
  }
};
var _default = exports.default = insertStaffTypes;