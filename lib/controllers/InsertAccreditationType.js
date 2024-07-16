"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _AccreditationTypeModel = _interopRequireDefault(require("../models/AccreditationTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertAccreditationTypes = async () => {
  try {
    const existingAccreditationTypes = await _AccreditationTypeModel.default.findAll();
    if (existingAccreditationTypes.length === 0) {
      const AccreditationTypesToInsert = [{
        categoriesId: 1,
        type_name: "BAB 1"
      }, {
        categoriesId: 1,
        type_name: "BAB 2"
      }, {
        categoriesId: 1,
        type_name: "BAB 3"
      }, {
        categoriesId: 1,
        type_name: "BAB 4"
      }, {
        categoriesId: 1,
        type_name: "BAB 5"
      }];
      await _AccreditationTypeModel.default.bulkCreate(AccreditationTypesToInsert);
      console.log("Inserted AccreditationTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting AccreditationTypes");
  }
};
var _default = exports.default = insertAccreditationTypes;