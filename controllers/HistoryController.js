import History from "../models/HistoryModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getHistoryUploads = async (req, res) => {
  try {
    const { order } = req.query;
    const history = await History.findAll({
      where: {
        [Op.or]: [{ action: "Tambah" }, { action: "Edit" }],
      },
      order: [["createdAt", order]],
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};

export const getHistoryDelete = async (req, res) => {
  try {
    const { order } = req.query;
    const history = await History.findAll({
      where: {
        action: "Hapus",
      },
      order: [["createdAt", order]],
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};

export const paginationHistoryUpload = async (req, res) => {
  try {
    const { page, pageSize, order } = req.query;
    const history = await History.findAll({
      where: {
        [Op.or]: [{ action: "Tambah" }, { action: "Edit" }],
      },
      order: [["createdAt", order]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};

export const paginationHistoryDelete = async (req, res) => {
  try {
    const { page, pageSize, order } = req.query;
    const history = await History.findAll({
      where: {
        action: "Hapus",
      },
      order: [["createdAt", order]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};

export const last7DaysUploads = async (req, res) => {
  try {
    const { page, pageSize, order } = req.query;
    const history = await History.findAll({
      where: {
        [Op.or]: [{ action: "Tambah" }, { action: "Edit" }],
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        },
      },
      order: [["createdAt", order]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTotalpagesUploadsDeletesLast7Days = async (req, res) => {
  try {
    const { pageSize } = req.query;
    const totalUpload = await History.count({
      where: {
        [Op.or]: [{ action: "Tambah" }, { action: "Edit" }],
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        },
      },
    });
    const totalPageUpload = Math.ceil(totalUpload / pageSize);

    const totalDelete = await History.count({
      where: {
        action: "Hapus",
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        },
      },
    });
    const totalPageDelete = Math.ceil(totalDelete / pageSize);
    res.status(200).json({ totalPageUpload, totalPageDelete });

  } catch (error) {
    console.log(error.message);
  }
};

export const last7DaysDeletes = async (req, res) => {
  try {
    const { page, pageSize, order } = req.query;
    const history = await History.findAll({
      where: {
        action: "Hapus",
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        },
      },
      order: [["createdAt", order]],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize),
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTotalpages = async (req, res) => {
  try {
    const { pageSize } = req.query;
    const totalUpload = await History.count({
      where: {
        [Op.or]: [{ action: "Tambah" }, { action: "Edit" }],
      },
    });
    const totalPageUpload = Math.ceil(totalUpload / pageSize);

    const totalDelete = await History.count({
      where: {
        action: "Hapus",
      },
    });
    const totalPageDelete = Math.ceil(totalDelete / pageSize);
    res.status(200).json({ totalPageUpload, totalPageDelete });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchHistoryUploads = async (req, res) => {
  try {
    let { search, order, page, pageSize } = req.query;
    page = parseInt(page); // Parse page as an integer
    pageSize = parseInt(pageSize); // Parse pageSize as an integer

    const offset = (page - 1) * pageSize; // Calculate offset based on current page and page size

    // Find all histories matching the search criteria
    const history = await History.findAndCountAll({
      where: {
        [Op.or]: [{ action: "Tambah" }, { action: "Edit" }],
        file_name: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [["createdAt", order]],
      limit: pageSize, // Limit the number of results per page
      offset: offset, // Apply the offset to start from the correct position
    });

    const totalRecords = history.count; // Total number of records matching the search criteria
    const totalPages = Math.ceil(totalRecords / pageSize); // Calculate total pages

    res.status(200).json({
      totalRecords: totalRecords,
      totalPages: totalPages,
      currentPage: page,
      pageSize: pageSize,
      data: history.rows, // Send the data for the current page
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchHistoryDeletes = async (req, res) => {
  try {
    let { search, order, page, pageSize } = req.query;
    page = parseInt(page); // Parse page as an integer
    pageSize = parseInt(pageSize); // Parse pageSize as an integer

    const offset = (page - 1) * pageSize; // Calculate offset based on current page and page size

    // Find all histories with action "Hapus" (Delete) matching the search criteria
    const history = await History.findAndCountAll({
      where: {
        action: "Hapus",
        file_name: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [["createdAt", order]],
      limit: pageSize, // Limit the number of results per page
      offset: offset, // Apply the offset to start from the correct position
    });

    const totalRecords = history.count; // Total number of records matching the search criteria
    const totalPages = Math.ceil(totalRecords / pageSize); // Calculate total pages

    res.status(200).json({
      totalRecords: totalRecords,
      totalPages: totalPages,
      currentPage: page,
      pageSize: pageSize,
      data: history.rows, // Send the data for the current page
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const last7Days = async (req, res) => {
  try {
    const { order } = req.query;
    const history = await History.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        },
      },
      order: [["createdAt", order]],
    });
    res.status(200).json(history);
  } catch (error) {
    console.log(error.message);
  }
};

export const readNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.findByPk(id);
    if (!history) {
      return res.status(404).json({ error: "History tidak ditemukan" });
    }

    await history.update({ isRead: true });

    res.status(200).json({ message: "Status isRead berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const postAllNotifications = async (req, res) => {
  try {
    const allHistory = await History.findAll();
    await Promise.all(
      allHistory.map(async (history) => {
        await history.update({ isRead: true });
      })
    );
    res.status(200).json({ message: "Status isRead berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const checkIfHaveNotification = async (req, res) => {
  try {
    const unreadHistory = await History.findAll({ where: { isRead: false } });
    if (unreadHistory.length > 0) {
      res.status(200).json({ hasNotification: true, unreadCount: unreadHistory.length });
    } else {
      res.status(200).json({ hasNotification: false, unreadCount: 0 });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}