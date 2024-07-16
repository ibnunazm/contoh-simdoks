"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _FinanceTypeModel = _interopRequireDefault(require("../models/FinanceTypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertFinanceTypes = async () => {
  try {
    const existingFinanceTypes = await _FinanceTypeModel.default.findAll();
    if (existingFinanceTypes.length === 0) {
      const FinanceTypesToInsert = [{
        categoriesId: 6,
        type_name: "Sumber Dana DAK"
      }, {
        categoriesId: 6,
        type_name: "BLUD Penerima"
      }, {
        categoriesId: 6,
        type_name: "BLUD Pengeluaran"
      }];
      await _FinanceTypeModel.default.bulkCreate(FinanceTypesToInsert);
      console.log("Inserted FinanceTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting FinanceTypes");
  }
};
var _default = exports.default = insertFinanceTypes;