"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _ItemSubtypeModel = _interopRequireDefault(require("../models/ItemSubtypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertItemSubtypes = async () => {
  try {
    const existingItemSubtypes = await _ItemSubtypeModel.default.findAll();
    if (existingItemSubtypes.length === 0) {
      const ItemSubtypesToInsert = [{
        typeId: 1,
        subtype_name: "Aset Tetap"
      }, {
        typeId: 1,
        subtype_name: "Aset Tidak Tetap"
      }];
      await _ItemSubtypeModel.default.bulkCreate(ItemSubtypesToInsert);
      console.log("Inserted ItemSubtypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting ItemSubtypes");
  }
};
var _default = exports.default = insertItemSubtypes;