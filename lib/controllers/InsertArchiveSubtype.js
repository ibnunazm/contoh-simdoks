"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _ArchiveSubtypeModel = _interopRequireDefault(require("../models/ArchiveSubtypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertArchiveSubtypes = async () => {
  try {
    const existingArchiveSubtypes = await _ArchiveSubtypeModel.default.findAll();
    if (existingArchiveSubtypes.length === 0) {
      const ArchiveSubtypesToInsert = [{
        typeId: 2,
        subtype_name: "Surat Masuk"
      }, {
        typeId: 2,
        subtype_name: "Surat Keluar"
      }];
      await _ArchiveSubtypeModel.default.bulkCreate(ArchiveSubtypesToInsert);
      console.log("Inserted ArchiveSubtypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting ArchiveSubtypes");
  }
};
var _default = exports.default = insertArchiveSubtypes;