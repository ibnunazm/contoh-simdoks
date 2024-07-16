"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFinance = exports.searchFinance = exports.getFinances = exports.getFinanceById = exports.filterByYears = exports.deleteFinance = exports.createFinance = exports.autoDeleteFinance = void 0;
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _FinanceModel = _interopRequireDefault(require("../models/FinanceModel.js"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getFinances = async (req, res) => {
  try {
    const finances = await _FinanceModel.default.findAll();
    res.status(200).json(finances);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getFinances = getFinances;
const getFinanceById = async (req, res) => {
  try {
    const finance = await _FinanceModel.default.findByPk(req.params.id);
    res.status(200).json(finance);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getFinanceById = getFinanceById;
const createFinance = async (req, res) => {
  try {
    const {
      nama,
      typeId,
      startDate
    } = req.body;
    const file = req.files.file;
    if (nama === "" || typeId === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }
    const existingFiles = await _FinanceModel.default.findAll({
      attributes: ["file_name"]
    });
    const fileExt = _path.default.extname(file.name).toLowerCase();
    const isDuplicateName = existingFiles.some(existingFile => existingFile.file_name === "".concat(nama).concat(fileExt));
    if (isDuplicateName) {
      return res.status(400).json("Nama file sudah terdapat dalam database gunakan nama file yang berbeda.");
    }
    const maxFileSize = 5000000;
    const fileSize = file.size;
    if (fileSize > maxFileSize) {
      return res.status(400).json("File size must be less than 5MB");
    }
    const fileUrl = "file/finances/".concat(nama).concat(fileExt);
    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const twentyYearLater = new Date(date);
    twentyYearLater.setFullYear(date.getFullYear() + 20);
    await _FinanceModel.default.create({
      categoriesId: 6,
      typeId: typeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: date,
      end_date: twentyYearLater
    });
    await file.mv("./public/file/finances/".concat(nama).concat(fileExt));
    res.status(201).json("Finance berhasil ditambahkan");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createFinance = createFinance;
const updateFinance = async (req, res) => {
  try {
    const {
      nama,
      typeId,
      file_url,
      startDate
    } = req.body;
    const file = req.files.file;
    if (nama === "" || typeId === "" || file_url === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }
    const existingFiles = await _FinanceModel.default.findAll({
      attributes: ["file_name"]
    });
    const fileExt = _path.default.extname(file.name).toLowerCase();
    const isDuplicateName = existingFiles.some(existingFile => existingFile.file_name === "".concat(nama).concat(fileExt));
    if (isDuplicateName) {
      return res.status(400).json("Nama file sudah terdapat dalam database gunakan nama file yang berbeda.");
    }
    const maxFileSize = 5000000;
    const fileSize = file.size;
    if (fileSize > maxFileSize) {
      return res.status(400).json("File size must be less than 5MB");
    }
    const fileUrl = "file/finances/".concat(nama).concat(fileExt);
    const previousFinances = await _FinanceModel.default.findByPk(req.params.id);
    if (previousFinances) {
      const previousFileUrl = "./public/".concat(previousFinances.file_url);
      if (_fs.default.existsSync(previousFileUrl)) {
        _fs.default.unlinkSync(previousFileUrl);
      }
    }
    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const twentyYearLater = new Date(date);
    twentyYearLater.setFullYear(date.getFullYear() + 20);
    await _FinanceModel.default.update({
      categoriesId: 6,
      typeId: typeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: date,
      end_date: twentyYearLater
    }, {
      where: {
        id: req.params.id
      }
    });
    await file.mv("./public/file/finances/".concat(nama).concat(fileExt));
    res.status(200).json("Finance berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateFinance = updateFinance;
const deleteFinance = async (req, res) => {
  try {
    const finance = await _FinanceModel.default.findByPk(req.params.id);
    const fileUrl = "./public/".concat(finance.file_url);
    if (_fs.default.existsSync(fileUrl)) {
      _fs.default.unlinkSync(fileUrl);
    }
    await _FinanceModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Finance berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteFinance = deleteFinance;
const searchFinance = async (req, res) => {
  try {
    const {
      search,
      typeId
    } = req.query;
    const finances = await _FinanceModel.default.findAll({
      where: {
        file_name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        },
        typeId: typeId
      }
    });
    res.status(200).json(finances);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchFinance = searchFinance;
const filterByYears = async (req, res) => {
  try {
    const {
      typeId,
      years
    } = req.query;
    const startDate = "".concat(years, "-01-01");
    const endDate = "".concat(parseInt(years) + 1, "-01-01");
    const finances = await _FinanceModel.default.findAll({
      where: {
        typeId: typeId,
        start_date: {
          [_sequelize.Op.between]: [startDate, endDate]
        }
      }
    });
    res.status(200).json(finances);
  } catch (error) {
    console.log(error.message);
  }
};
exports.filterByYears = filterByYears;
const autoDeleteFinance = async () => {
  try {
    const expiredFinances = await _FinanceModel.default.findAll({
      where: {
        end_date: {
          [_sequelize.Op.lt]: new Date()
        }
      }
    });
    await Promise.all(expiredFinances.map(async finance => {
      const filePath = _path.default.join("public/", finance.file_url);
      await finance.destroy();
      _fs.default.unlinkSync(filePath);
    }));
    console.log("Pengecekan dan penghapusan berhasil dilakukan.");
  } catch (error) {
    console.error("Gagal melakukan pengecekan dan penghapusan:", error);
  }
};
exports.autoDeleteFinance = autoDeleteFinance;