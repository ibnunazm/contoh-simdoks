"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _ProgramTypeModel = _interopRequireDefault(require("../models/ProgramTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertProgramTypes = async () => {
  try {
    const existingProgramTypes = await _ProgramTypeModel.default.findAll();
    if (existingProgramTypes.length === 0) {
      const ProgramTypesToInsert = [{
        categoriesId: 4,
        type_name: "Esensial"
      }, {
        categoriesId: 4,
        type_name: "Upaya Kesehatan Pengembangan"
      }, {
        categoriesId: 4,
        type_name: "Upaya Kesehatan Perorangan"
      }];
      await _ProgramTypeModel.default.bulkCreate(ProgramTypesToInsert);
      console.log("Inserted ProgramTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting ProgramTypes");
  }
};
var _default = exports.default = insertProgramTypes;