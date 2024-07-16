import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import Archives from "../models/ArchiveModel.js";
import Accreditations from "../models/AccreditationModel.js";
import Staffs from "../models/StaffModel.js";
import Finances from "../models/FinanceModel.js";
import Items from "../models/ItemModel.js";
import Programs from "../models/ProgramModel.js";
import Tasks from "../models/TaskModel.js";

export const getFile = (req, res) => {
  const { page, pageSize, order } = req.query;
  const { fileUrl } = req.query;
  const filePath = `./public/${fileUrl}`;
  console.log(filePath);

  // Periksa apakah file ada
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("File not found");
      return;
    }

    // Membaca file
    const fileStream = fs.createReadStream(filePath);

    // Mengirimkan file sebagai response
    res.setHeader("Content-Type", getContentType(fileUrl));
    res.setHeader("Content-Disposition", `inline; filename="${fileUrl}"`);
    fileStream.pipe(res);
  });
};

// Mendapatkan tipe konten berkas berdasarkan ekstensi
function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
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

export const getAllFilesDeletedIn7Days = async (req, res) => {
  try {
    let { page, pageSize, search } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 7;
    const offset = (page - 1) * pageSize;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const whereClause = {
      end_date: {
        [Op.gt]: currentDate,
        [Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    };

    if (search) {
      whereClause.file_name = { [Op.like]: `%${search}%` };
    }

    const finances = await Finances.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const items = await Items.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const programs = await Programs.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const tasks = await Tasks.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const archives = await Archives.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const totalCount = finances.count + items.count + programs.count + tasks.count + archives.count;

    const allFiles = [
      ...finances.rows,
      ...items.rows,
      ...programs.rows,
      ...tasks.rows,
      ...archives.rows,
    ];

    res.status(200).json({ total: totalCount, page, pageSize, data: allFiles });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchFileDeletedIn7Days = async (req, res) => {
  try {
    let { page, pageSize, search } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 7;
    const offset = (page - 1) * pageSize;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const whereClause = {
      end_date: {
        [Op.gt]: currentDate,
        [Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    };

    if (search) {
      whereClause.file_name = { [Op.like]: `%${search}%` };
    }

    const finances = await Finances.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const items = await Items.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const programs = await Programs.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const tasks = await Tasks.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const archives = await Archives.findAndCountAll({
      attributes: ["file_name", "start_date", "end_date"],
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const totalCount = finances.count + items.count + programs.count + tasks.count + archives.count;

    const allFiles = [
      ...finances.rows,
      ...items.rows,
      ...programs.rows,
      ...tasks.rows,
      ...archives.rows,
    ];

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({ total: totalCount, page, pageSize, totalPages, data: allFiles });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getTotalPagesDeletedIn7Days = async (req, res) => {
  const { pageSize } = req.query;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const totalFinances = await Finances.count({
    where: {
      [Op.and]: [
        {
          end_date: {
            [Op.gt]: currentDate,
          },
        },
        {
          end_date: {
            [Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      ],
    },
  });

  const totalItems = await Items.count({
    where: {
      [Op.and]: [
        {
          end_date: {
            [Op.gt]: currentDate,
          },
        },
        {
          end_date: {
            [Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      ],
    },
  });

  const totalPrograms = await Programs.count({
    where: {
      [Op.and]: [
        {
          end_date: {
            [Op.gt]: currentDate,
          },
        },
        {
          end_date: {
            [Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      ],
    },
  });

  const totalTasks = await Tasks.count({
    where: {
      [Op.and]: [
        {
          end_date: {
            [Op.gt]: currentDate,
          },
        },
        {
          end_date: {
            [Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      ],
    },
  });

  const totalArchives = await Archives.count({
    where: {
      [Op.and]: [
        {
          end_date: {
            [Op.gt]: currentDate,
          },
        },
        {
          end_date: {
            [Op.lte]: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      ],
    },
  });

  const totalPages = Math.ceil((totalFinances + totalItems + totalPrograms + totalTasks + totalArchives) / pageSize);
  res.status(200).json({ totalPages });
}
  
export const getReminderTotalFileDeletePerDaysIn7Days = async (req, res) => {
  try {
    const {indexQuery} = req.query;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const totalFilesPerDay = [];
    let index = 0
    for (let i = 0; i < 7; i++) {
      const fromDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      const endDate = new Date(fromDate.getTime() + 24 * 60 * 60 * 1000);

      const totalFinances = await Finances.count({
        where: {
          end_date: {
            [Op.and]: {
              [Op.gt]: fromDate,
              [Op.lte]: endDate,
            },
          },
        },
      });

      const totalItems = await Items.count({
        where: {
          end_date: {
            [Op.and]: {
              [Op.gt]: fromDate,
              [Op.lte]: endDate,
            },
          },
        },
      });

      const totalPrograms = await Programs.count({
        where: {
          end_date: {
            [Op.and]: {
              [Op.gt]: fromDate,
              [Op.lte]: endDate,
            },
          },
        },
      });

      const totalTasks = await Tasks.count({
        where: {
          end_date: {
            [Op.and]: {
              [Op.gt]: fromDate,
              [Op.lte]: endDate,
            },
          },
        },
      });

      const totalArchives = await Archives.count({
        where: {
          end_date: {
            [Op.and]: {
              [Op.gt]: fromDate,
              [Op.lte]: endDate,
            },
          },
        },
      });

      const untilDate = new Date(endDate.getTime() +  24 * 60 * 60 * 1000);
      const dateNow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

      const totalFiles = totalFinances + totalItems + totalPrograms + totalTasks + totalArchives;
      if (totalFiles > 0){
        index+=1
        totalFilesPerDay.push({ index, totalFiles, dateNow, untilDate});
      }
    }

    let totalFile = [];

    for (let i = 0; i < totalFilesPerDay.length; i++){
      if (indexQuery == totalFilesPerDay[i].index){
        totalFile.push(totalFilesPerDay[i]);
        break;
      }
    }

    res.status(200).json({ totalFilesPerDay, totalFile, totalIndex: index });
  } catch (error) {
    console.log(error.message);
  }
};
