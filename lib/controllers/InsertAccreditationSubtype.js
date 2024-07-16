"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _AccreditationSubtypeModel = _interopRequireDefault(require("../models/AccreditationSubtypeModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertAccreditationSubtypes = async () => {
  try {
    const existingAccreditationSubtypes = await _AccreditationSubtypeModel.default.findAll();
    if (existingAccreditationSubtypes.length === 0) {
      const AccreditationSubtypesToInsert = [{
        typeId: 1,
        subtype_name: "BAB 1.1"
      }, {
        typeId: 1,
        subtype_name: "BAB 1.2"
      }, {
        typeId: 1,
        subtype_name: "BAB 1.3"
      }, {
        typeId: 1,
        subtype_name: "BAB 1.4"
      }, {
        typeId: 1,
        subtype_name: "BAB 1.5"
      }, {
        typeId: 1,
        subtype_name: "BAB 1.6"
      }, {
        typeId: 1,
        subtype_name: "BAB 1.7"
      }, {
        typeId: 2,
        subtype_name: "BAB 2.1"
      }, {
        typeId: 2,
        subtype_name: "BAB 2.2"
      }, {
        typeId: 2,
        subtype_name: "BAB 2.3"
      }, {
        typeId: 2,
        subtype_name: "BAB 2.4"
      }, {
        typeId: 2,
        subtype_name: "BAB 2.5"
      }, {
        typeId: 2,
        subtype_name: "BAB 2.6"
      }, {
        typeId: 2,
        subtype_name: "BAB 2.7"
      }, {
        typeId: 2,
        subtype_name: "BAB 2.8"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.1"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.2"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.3"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.4"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.5"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.6"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.7"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.8"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.9"
      }, {
        typeId: 3,
        subtype_name: "BAB 3.10"
      }, {
        typeId: 4,
        subtype_name: "BAB 4.1"
      }, {
        typeId: 4,
        subtype_name: "BAB 4.2"
      }, {
        typeId: 4,
        subtype_name: "BAB 4.3"
      }, {
        typeId: 4,
        subtype_name: "BAB 4.4"
      }, {
        typeId: 4,
        subtype_name: "BAB 4.5"
      }, {
        typeId: 5,
        subtype_name: "BAB 5.1"
      }, {
        typeId: 5,
        subtype_name: "BAB 5.2"
      }, {
        typeId: 5,
        subtype_name: "BAB 5.3"
      }, {
        typeId: 5,
        subtype_name: "BAB 5.4"
      }, {
        typeId: 5,
        subtype_name: "BAB 5.5"
      }];
      await _AccreditationSubtypeModel.default.bulkCreate(AccreditationSubtypesToInsert);
      console.log("Inserted AccreditationSubtypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting AccreditationSubtypes");
  }
};
var _default = exports.default = insertAccreditationSubtypes;