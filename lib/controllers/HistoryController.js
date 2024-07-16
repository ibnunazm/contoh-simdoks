"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchHistoryUploads = exports.searchHistoryDeletes = exports.readNotification = exports.postAllNotifications = exports.paginationHistoryUpload = exports.paginationHistoryDelete = exports.last7DaysUploads = exports.last7DaysDeletes = exports.last7Days = exports.getTotalpagesUploadsDeletesLast7Days = exports.getTotalpages = exports.getHistoryUploads = exports.getHistoryDelete = exports.checkIfHaveNotification = void 0;
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _HistoryModel = _interopRequireDefault(require("../models/HistoryModel.js"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getHistoryUploads = async (req, res) => {
  try {
    const {
      order
    } = req.query;
    const history = await _HistoryModel.default.findAll({
      where: {
        [_sequelize.Op.or]: [{
          action: "Tambah"
        }, {
          action: "Edit"
        }]
      },
      order: [["createdAt", order]]
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getHistoryUploads = getHistoryUploads;
const getHistoryDelete = async (req, res) => {
  try {
    const {
      order
    } = req.query;
    const history = await _HistoryModel.default.findAll({
      where: {
        action: "Hapus"
      },
      order: [["createdAt", order]]
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};
exports.getHistoryDelete = getHistoryDelete;
const paginationHistoryUpload = async (req, res) => {
  try {
    const {
      page,
      pageSize,
      order
    } = req.query;
    const history = await _HistoryModel.default.findAll({
      where: {
        [_sequelize.Op.or]: [{
          action: "Tambah"
        }, {
          action: "Edit"
        }]
      },
      order: [["createdAt", order]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize)
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};
exports.paginationHistoryUpload = paginationHistoryUpload;
const paginationHistoryDelete = async (req, res) => {
  try {
    const {
      page,
      pageSize,
      order
    } = req.query;
    const history = await _HistoryModel.default.findAll({
      where: {
        action: "Hapus"
      },
      order: [["createdAt", order]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize)
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};
exports.paginationHistoryDelete = paginationHistoryDelete;
const last7DaysUploads = async (req, res) => {
  try {
    const {
      page,
      pageSize,
      order
    } = req.query;
    const history = await _HistoryModel.default.findAll({
      where: {
        [_sequelize.Op.or]: [{
          action: "Tambah"
        }, {
          action: "Edit"
        }],
        createdAt: {
          [_sequelize.Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
      },
      order: [["createdAt", order]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize)
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};
exports.last7DaysUploads = last7DaysUploads;
const getTotalpagesUploadsDeletesLast7Days = async (req, res) => {
  try {
    const {
      pageSize
    } = req.query;
    const totalUpload = await _HistoryModel.default.count({
      where: {
        [_sequelize.Op.or]: [{
          action: "Tambah"
        }, {
          action: "Edit"
        }],
        createdAt: {
          [_sequelize.Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
      }
    });
    const totalPageUpload = Math.ceil(totalUpload / pageSize);
    const totalDelete = await _HistoryModel.default.count({
      where: {
        action: "Hapus",
        createdAt: {
          [_sequelize.Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
      }
    });
    const totalPageDelete = Math.ceil(totalDelete / pageSize);
    res.status(200).json({
      totalPageUpload,
      totalPageDelete
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.getTotalpagesUploadsDeletesLast7Days = getTotalpagesUploadsDeletesLast7Days;
const last7DaysDeletes = async (req, res) => {
  try {
    const {
      page,
      pageSize,
      order
    } = req.query;
    const history = await _HistoryModel.default.findAll({
      where: {
        action: "Hapus",
        createdAt: {
          [_sequelize.Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
      },
      order: [["createdAt", order]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize)
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};
exports.last7DaysDeletes = last7DaysDeletes;
const getTotalpages = async (req, res) => {
  try {
    const {
      pageSize
    } = req.query;
    const totalUpload = await _HistoryModel.default.count({
      where: {
        [_sequelize.Op.or]: [{
          action: "Tambah"
        }, {
          action: "Edit"
        }]
      }
    });
    const totalPageUpload = Math.ceil(totalUpload / pageSize);
    const totalDelete = await _HistoryModel.default.count({
      where: {
        action: "Hapus"
      }
    });
    const totalPageDelete = Math.ceil(totalDelete / pageSize);
    res.status(200).json({
      totalPageUpload,
      totalPageDelete
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.getTotalpages = getTotalpages;
const searchHistoryUploads = async (req, res) => {
  try {
    let {
      search,
      order,
      page,
      pageSize
    } = req.query;
    page = parseInt(page); // Parse page as an integer
    pageSize = parseInt(pageSize); // Parse pageSize as an integer

    const offset = (page - 1) * pageSize; // Calculate offset based on current page and page size

    // Find all histories matching the search criteria
    const history = await _HistoryModel.default.findAndCountAll({
      where: {
        [_sequelize.Op.or]: [{
          action: "Tambah"
        }, {
          action: "Edit"
        }],
        file_name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      },
      order: [["createdAt", order]],
      limit: pageSize,
      // Limit the number of results per page
      offset: offset // Apply the offset to start from the correct position
    });
    const totalRecords = history.count; // Total number of records matching the search criteria
    const totalPages = Math.ceil(totalRecords / pageSize); // Calculate total pages

    res.status(200).json({
      totalRecords: totalRecords,
      totalPages: totalPages,
      currentPage: page,
      pageSize: pageSize,
      data: history.rows // Send the data for the current page
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
exports.searchHistoryUploads = searchHistoryUploads;
const searchHistoryDeletes = async (req, res) => {
  try {
    let {
      search,
      order,
      page,
      pageSize
    } = req.query;
    page = parseInt(page); // Parse page as an integer
    pageSize = parseInt(pageSize); // Parse pageSize as an integer

    const offset = (page - 1) * pageSize; // Calculate offset based on current page and page size

    // Find all histories with action "Hapus" (Delete) matching the search criteria
    const history = await _HistoryModel.default.findAndCountAll({
      where: {
        action: "Hapus",
        file_name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      },
      order: [["createdAt", order]],
      limit: pageSize,
      // Limit the number of results per page
      offset: offset // Apply the offset to start from the correct position
    });
    const totalRecords = history.count; // Total number of records matching the search criteria
    const totalPages = Math.ceil(totalRecords / pageSize); // Calculate total pages

    res.status(200).json({
      totalRecords: totalRecords,
      totalPages: totalPages,
      currentPage: page,
      pageSize: pageSize,
      data: history.rows // Send the data for the current page
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
exports.searchHistoryDeletes = searchHistoryDeletes;
const last7Days = async (req, res) => {
  try {
    const {
      order
    } = req.query;
    const history = await _HistoryModel.default.findAll({
      where: {
        createdAt: {
          [_sequelize.Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
      },
      order: [["createdAt", order]]
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};
exports.last7Days = last7Days;
const readNotification = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const history = await _HistoryModel.default.findByPk(id);
    if (!history) {
      return res.status(404).json({
        error: "History tidak ditemukan"
      });
    }
    await history.update({
      isRead: true
    });
    res.status(200).json({
      message: "Status isRead berhasil diupdate"
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.readNotification = readNotification;
const postAllNotifications = async (req, res) => {
  try {
    const allHistory = await _HistoryModel.default.findAll();
    await Promise.all(allHistory.map(async history => {
      await history.update({
        isRead: true
      });
    }));
    res.status(200).json({
      message: "Status isRead berhasil diupdate"
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.postAllNotifications = postAllNotifications;
const checkIfHaveNotification = async (req, res) => {
  try {
    const unreadHistory = await _HistoryModel.default.findAll({
      where: {
        isRead: false
      }
    });
    if (unreadHistory.length > 0) {
      res.status(200).json({
        hasNotification: true,
        unreadCount: unreadHistory.length
      });
    } else {
      res.status(200).json({
        hasNotification: false,
        unreadCount: 0
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
exports.checkIfHaveNotification = checkIfHaveNotification;