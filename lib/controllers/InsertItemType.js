"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _ItemTypeModel = _interopRequireDefault(require("../models/ItemTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertItemTypes = async () => {
  try {
    const existingItemTypes = await _ItemTypeModel.default.findAll();
    if (existingItemTypes.length === 0) {
      const ItemTypesToInsert = [{
        categoriesId: 3,
        type_name: "Aset"
      }, {
        categoriesId: 3,
        type_name: "Persediaan"
      }];
      await _ItemTypeModel.default.bulkCreate(ItemTypesToInsert);
      console.log("Inserted ItemTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting ItemTypes");
  }
};
var _default = exports.default = insertItemTypes;