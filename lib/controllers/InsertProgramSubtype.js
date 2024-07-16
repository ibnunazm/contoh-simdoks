"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _ProgramSubtypeModel = _interopRequireDefault(require("../models/ProgramSubtypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertProgramSubtypes = async () => {
  try {
    const existingProgramSubtypes = await _ProgramSubtypeModel.default.findAll();
    if (existingProgramSubtypes.length === 0) {
      const ProgramSubtypesToInsert = [{
        typeId: 1,
        subtype_name: "Promosi Kesehatan"
      }, {
        typeId: 1,
        subtype_name: "Kesehatan Lingkungan"
      }, {
        typeId: 1,
        subtype_name: "Kesehatan Keluarga"
      }, {
        typeId: 1,
        subtype_name: "Gizi"
      }, {
        typeId: 1,
        subtype_name: "Pencegahan dan Pengendalian Penyakit"
      }, {
        typeId: 1,
        subtype_name: "Pelayanan Keperawatan Kesehatan Masyarakat"
      }, {
        typeId: 2,
        subtype_name: "Kesehatan Kerja dan Kesehatan Olahraga"
      }, {
        typeId: 2,
        subtype_name: "Haji"
      }, {
        typeId: 2,
        subtype_name: "Kesehatan Tradisional"
      }, {
        typeId: 2,
        subtype_name: "Kesehatan Kerja dan Kesehatan Olahraga"
      }, {
        typeId: 2,
        subtype_name: "Upaya Kesehatan Gigi Masyarakat"
      }, {
        typeId: 3,
        subtype_name: "Rawat Jalan"
      }, {
        typeId: 3,
        subtype_name: "Rawat Inap"
      }, {
        typeId: 3,
        subtype_name: "Rekam Medis"
      }, {
        typeId: 3,
        subtype_name: "Farmasi"
      }, {
        typeId: 3,
        subtype_name: "Laboratorium"
      }];
      await _ProgramSubtypeModel.default.bulkCreate(ProgramSubtypesToInsert);
      console.log("Inserted Program Subtypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting Program Subtypes");
  }
};
var _default = exports.default = insertProgramSubtypes;