"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _ArchiveTypeModel = _interopRequireDefault(require("../models/ArchiveTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertArchiveTypes = async () => {
  try {
    const existingArchiveTypes = await _ArchiveTypeModel.default.findAll();
    if (existingArchiveTypes.length === 0) {
      const ArchiveTypesToInsert = [{
        categoriesId: 5,
        type_name: "Arsip Statis"
      }, {
        categoriesId: 5,
        type_name: "Arsip Dinamis"
      }];
      await _ArchiveTypeModel.default.bulkCreate(ArchiveTypesToInsert);
      console.log("Inserted ArchiveTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting AccreditationTypes");
  }
};
var _default = exports.default = insertArchiveTypes;