"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItem = exports.searchItem = exports.getItemsBySubtypeId = exports.getItems = exports.getItemById = exports.filterByYears = exports.deleteItem = exports.createItem = exports.autoDeleteItem = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _ItemModel = _interopRequireDefault(require("../models/ItemModel.js"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getItems = async (req, res) => {
  try {
    const Item = await _ItemModel.default.findAll();
    res.status(200).json(Item);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getItems = getItems;
const getItemById = async (req, res) => {
  try {
    const item = await _ItemModel.default.findByPk(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getItemById = getItemById;
const createItem = async (req, res) => {
  try {
    const {
      nama,
      typeId,
      subtypeId,
      startDate
    } = req.body;
    const file = req.files.file;
    if (nama === "" || typeId === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }
    const existingFiles = await _ItemModel.default.findAll({
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
    const fileUrl = "file/items/".concat(nama).concat(fileExt);
    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const fiveYearsLater = new Date(date);
    fiveYearsLater.setFullYear(date.getFullYear() + 5);
    await _ItemModel.default.create({
      categoriesId: 3,
      typeId: typeId,
      subtypeId: subtypeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: date,
      end_date: fiveYearsLater
    });
    await file.mv("./public/file/items/".concat(nama).concat(fileExt));
    res.status(201).json("Item berhasil ditambahkan");
  } catch (error) {
    console.log(error.message);
  }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
  try {
    const {
      nama,
      startDate,
      typeId,
      subtypeId
    } = req.body;
    const file = req.files.file;
    if (nama === "" || startDate === "" || typeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }
    const existingFiles = await _ItemModel.default.findAll({
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
    const fileUrl = "file/items/".concat(nama).concat(fileExt);
    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const fiveYearsLater = new Date(date);
    fiveYearsLater.setFullYear(date.getFullYear() + 5);
    const oldItem = await _ItemModel.default.findByPk(req.params.id);
    await _ItemModel.default.update({
      categoriesId: 3,
      typeId: typeId,
      subtypeId: subtypeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: date,
      end_date: fiveYearsLater
    }, {
      where: {
        id: req.params.id
      }
    });
    await file.mv("./public/file/items/".concat(nama).concat(fileExt));
    _fs.default.unlinkSync("./public/".concat(oldItem.file_url));
    res.status(200).json("Item berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
  try {
    const item = await _ItemModel.default.findByPk(req.params.id);
    const fileUrl = "./public/".concat(item.file_url);
    if (_fs.default.existsSync(fileUrl)) {
      _fs.default.unlinkSync(fileUrl);
    }
    await _ItemModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json("Item berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};
exports.deleteItem = deleteItem;
const getItemsBySubtypeId = async (req, res) => {
  try {
    const {
      subtypeId,
      typeId
    } = req.body;
    let items = "";
    if (subTypeId) {
      items = await _ItemModel.default.findAll({
        where: {
          subtypeId: subtypeId,
          typeId: typeId
        }
      });
    } else {
      items = await _ItemModel.default.findAll({
        where: {
          typeId: typeId
        }
      });
    }
    res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getItemsBySubtypeId = getItemsBySubtypeId;
const filterByYears = async (req, res) => {
  try {
    const {
      typeId,
      subtypeId,
      years
    } = req.query;
    let items = "";
    if (subtypeId) {
      items = await _ItemModel.default.findAll({
        where: {
          typeId: typeId,
          subtypeId: subtypeId,
          start_date: {
            [_sequelize.Op.between]: ["".concat(years, "-01-01"), "".concat(years, "-12-31")]
          }
        }
      });
    } else {
      items = await _ItemModel.default.findAll({
        where: {
          typeId: typeId,
          start_date: {
            [_sequelize.Op.between]: ["".concat(years, "-01-01"), "".concat(years, "-12-31")]
          }
        }
      });
    }
    res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
  }
};
exports.filterByYears = filterByYears;
const searchItem = async (req, res) => {
  try {
    const {
      search,
      typeId,
      subtypeId
    } = req.query;
    let items = "";
    if (subtypeId) {
      items = await _ItemModel.default.findAll({
        where: {
          file_name: {
            [_sequelize.Op.like]: "%".concat(search, "%")
          },
          typeId: typeId,
          subtypeId: subtypeId
        }
      });
    } else {
      items = await _ItemModel.default.findAll({
        where: {
          file_name: {
            [_sequelize.Op.like]: "%".concat(search, "%")
          },
          typeId: typeId
        }
      });
    }
    res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
  }
};
exports.searchItem = searchItem;
const autoDeleteItem = async () => {
  try {
    const expiredItems = await _ItemModel.default.findAll({
      where: {
        end_date: {
          [_sequelize.Op.lt]: new Date()
        }
      }
    });
    await Promise.all(expiredItems.map(async item => {
      const filePath = _path.default.join("public/", item.file_url);
      await item.destroy();
      _fs.default.unlinkSync(filePath);
    }));
    console.log("Pengecekan dan penghapusan berhasil dilakukan.");
  } catch (error) {
    console.error("Gagal melakukan pengecekan dan penghapusan:", error);
  }
};
exports.autoDeleteItem = autoDeleteItem;