"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchFileDeletedIn7Days = exports.getTotalPagesDeletedIn7Days = exports.getReminderTotalFileDeletePerDaysIn7Days = exports.getFile = exports.getAllFilesDeletedIn7Days = void 0;
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _sequelize = require("sequelize");
var _ArchiveModel = _interopRequireDefault(require("../models/ArchiveModel.js"));
var _AccreditationModel = _interopRequireDefault(require("../models/AccreditationModel.js"));
var _StaffModel = _interopRequireDefault(require("../models/StaffModel.js"));
var _FinanceModel = _interopRequireDefault(require("../models/FinanceModel.js"));
var _ItemModel = _interopRequireDefault(require("../models/ItemModel.js"));
var _ProgramModel = _interopRequireDefault(require("../models/ProgramModel.js"));
var _TaskModel = _interopRequireDefault(require("../models/TaskModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getFile = (req, res) => {
  const {
    page,
    pageSize,
    order
  } = req.query;
  const {
    fileUrl
  } = req.query;
  const filePath = "./public/".concat(fileUrl);
  console.log(filePath);

  // Periksa apakah file ada
  _fs.default.access(filePath, _fs.default.constants.F_OK, err => {
    if (err) {
      res.status(404).send("File not found");
      return;
    }

    // Membaca file
    const fileStream = _fs.default.createReadStream(filePath);

    // Mengirimkan file sebagai response
    res.setHeader("Content-Type", getContentType(fileUrl));
    res.setHeader("Content-Disposition", "inline; filename=\"".concat(fileUrl, "\""));
    fileStream.pipe(res);
  });
};

// Mendapatkan tipe konten berkas berdasarkan ekstensi
exports.getFile = getFile;
function getContentType(fileName) {
  const ext = _path.default.extname(fileName).toLowerCase();
  // const contentType = { ".pdf" : "application/pdf", ".txt" : "text/plain", ".jpg" : "image/jpeg", ".jpeg" : "image/jpeg", ".png" : "image/png"};

  // return contentType[ext] || "application/octet-stream";

  switch (ext) {
    case ".pdf":
      return "application/pdf";
    case ".txt":
      return "text/plain";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    // Tambahkan jenis konten lainnya sesuai kebutuhan Anda
    default:
      return "application/octet-stream";
  }
}
const getAllFilesDeletedIn7Days = async (req, res) => {
  try {
    let {
      page,
      pageSize,
      search
    } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 7;
    const offset = (page - 1) * pageSize;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const whereClause = {
      end_date: {
        [_sequelize.Op.gt]: currentDate,
        [_sequelize.Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      }
    };
    if (search) {
      whereClause.file_name = {
        [_sequelize.Op.like]: "%".concat(search, "%")
      };
    }
    const finances = await _FinanceModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const items = await _ItemModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const programs = await _ProgramModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const tasks = await _TaskModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const archives = await _ArchiveModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const totalCount = finances.count + items.count + programs.count + tasks.count + archives.count;
    const allFiles = [...finances.rows, ...items.rows, ...programs.rows, ...tasks.rows, ...archives.rows];
    res.status(200).json({
      total: totalCount,
      page,
      pageSize,
      data: allFiles
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
exports.getAllFilesDeletedIn7Days = getAllFilesDeletedIn7Days;
const searchFileDeletedIn7Days = async (req, res) => {
  try {
    let {
      page,
      pageSize,
      search
    } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 7;
    const offset = (page - 1) * pageSize;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const whereClause = {
      end_date: {
        [_sequelize.Op.gt]: currentDate,
        [_sequelize.Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      }
    };
    if (search) {
      whereClause.file_name = {
        [_sequelize.Op.like]: "%".concat(search, "%")
      };
    }
    const finances = await _FinanceModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const items = await _ItemModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const programs = await _ProgramModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const tasks = await _TaskModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const archives = await _ArchiveModel.default.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset
    });
    const totalCount = finances.count + items.count + programs.count + tasks.count + archives.count;
    const allFiles = [...finances.rows, ...items.rows, ...programs.rows, ...tasks.rows, ...archives.rows];
    const totalPages = Math.ceil(totalCount / pageSize);
    res.status(200).json({
      total: totalCount,
      page,
      pageSize,
      totalPages,
      data: allFiles
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
exports.searchFileDeletedIn7Days = searchFileDeletedIn7Days;
const getTotalPagesDeletedIn7Days = async (req, res) => {
  const {
    pageSize
  } = req.query;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const totalFinances = await _FinanceModel.default.count({
    where: {
      [_sequelize.Op.and]: [{
        end_date: {
          [_sequelize.Op.gt]: currentDate
        }
      }, {
        end_date: {
          [_sequelize.Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
      }]
    }
  });
  const totalItems = await _ItemModel.default.count({
    where: {
      [_sequelize.Op.and]: [{
        end_date: {
          [_sequelize.Op.gt]: currentDate
        }
      }, {
        end_date: {
          [_sequelize.Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
      }]
    }
  });
  const totalPrograms = await _ProgramModel.default.count({
    where: {
      [_sequelize.Op.and]: [{
        end_date: {
          [_sequelize.Op.gt]: currentDate
        }
      }, {
        end_date: {
          [_sequelize.Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
      }]
    }
  });
  const totalTasks = await _TaskModel.default.count({
    where: {
      [_sequelize.Op.and]: [{
        end_date: {
          [_sequelize.Op.gt]: currentDate
        }
      }, {
        end_date: {
          [_sequelize.Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
      }]
    }
  });
  const totalArchives = await _ArchiveModel.default.count({
    where: {
      [_sequelize.Op.and]: [{
        end_date: {
          [_sequelize.Op.gt]: currentDate
        }
      }, {
        end_date: {
          [_sequelize.Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
      }]
    }
  });
  const totalPages = Math.ceil((totalFinances + totalItems + totalPrograms + totalTasks + totalArchives) / pageSize);
  res.status(200).json({
    totalPages
  });
};
exports.getTotalPagesDeletedIn7Days = getTotalPagesDeletedIn7Days;
const getReminderTotalFileDeletePerDaysIn7Days = async (req, res) => {
  try {
    const {
      indexQuery
    } = req.query;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const totalFilesPerDay = [];
    let index = 0;
    for (let i = 0; i < 7; i++) {
      const fromDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      const endDate = new Date(fromDate.getTime() + 24 * 60 * 60 * 1000);
      const totalFinances = await _FinanceModel.default.count({
        where: {
          end_date: {
            [_sequelize.Op.and]: {
              [_sequelize.Op.gt]: fromDate,
              [_sequelize.Op.lte]: endDate
            }
          }
        }
      });
      const totalItems = await _ItemModel.default.count({
        where: {
          end_date: {
            [_sequelize.Op.and]: {
              [_sequelize.Op.gt]: fromDate,
              [_sequelize.Op.lte]: endDate
            }
          }
        }
      });
      const totalPrograms = await _ProgramModel.default.count({
        where: {
          end_date: {
            [_sequelize.Op.and]: {
              [_sequelize.Op.gt]: fromDate,
              [_sequelize.Op.lte]: endDate
            }
          }
        }
      });
      const totalTasks = await _TaskModel.default.count({
        where: {
          end_date: {
            [_sequelize.Op.and]: {
              [_sequelize.Op.gt]: fromDate,
              [_sequelize.Op.lte]: endDate
            }
          }
        }
      });
      const totalArchives = await _ArchiveModel.default.count({
        where: {
          end_date: {
            [_sequelize.Op.and]: {
              [_sequelize.Op.gt]: fromDate,
              [_sequelize.Op.lte]: endDate
            }
          }
        }
      });
      const untilDate = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
      const dateNow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      const totalFiles = totalFinances + totalItems + totalPrograms + totalTasks + totalArchives;
      if (totalFiles > 0) {
        index += 1;
        totalFilesPerDay.push({
          index,
          totalFiles,
          dateNow,
          untilDate
        });
      }
    }
    let totalFile = [];
    for (let i = 0; i < totalFilesPerDay.length; i++) {
      if (indexQuery == totalFilesPerDay[i].index) {
        totalFile.push(totalFilesPerDay[i]);
        break;
      }
    }
    res.status(200).json({
      totalFilesPerDay,
      totalFile,
      totalIndex: index
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.getReminderTotalFileDeletePerDaysIn7Days = getReminderTotalFileDeletePerDaysIn7Days;