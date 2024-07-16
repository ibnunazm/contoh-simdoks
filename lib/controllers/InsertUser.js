"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const insertUsers = async () => {
  try {
    const existingUsers = await _UserModel.default.findAll();
    const salt = await _bcrypt.default.genSalt();
    if (existingUsers.length === 0) {
      const UsersToInsert = [{
        username: "ibnua11",
        password: await _bcrypt.default.hash("ibnua11", salt),
        role: "leader"
      }, {
        username: "leader",
        password: await _bcrypt.default.hash("leader", salt),
        role: "leader"
      }, {
        username: "Akreditasi",
        password: await _bcrypt.default.hash("akreditasi", salt),
        role: "staff akreditasi"
      }, {
        username: "barang",
        password: await _bcrypt.default.hash("barang", salt),
        role: "staff barang"
      }, {
        username: "kepegawaian",
        password: await _bcrypt.default.hash("kepegawaian", salt),
        role: "staff kepegawaian"
      }, {
        username: "program",
        password: await _bcrypt.default.hash("program", salt),
        role: "staff program"
      }, {
        username: "surat",
        password: await _bcrypt.default.hash("surat", salt),
        role: "staff surat"
      }, {
        username: "keuangan",
        password: await _bcrypt.default.hash("keuangan", salt),
        role: "staff keuangan"
      }, {
        username: "tugas",
        password: await _bcrypt.default.hash("tugas", salt),
        role: "staff tugas"
      }];
      await _UserModel.default.bulkCreate(UsersToInsert);
      console.log("Inserted users successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting users");
  }
};
var _default = exports.default = insertUsers;