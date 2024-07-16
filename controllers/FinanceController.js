import Finances from "../models/FinanceModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getFinances = async (req, res) => {
  try {
    const finances = await Finances.findAll();
    res.status(200).json(finances);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFinanceById = async (req, res) => {
  try {
    const finance = await Finances.findByPk(req.params.id);
    res.status(200).json(finance);
  } catch (error) {
    console.log(error.message);
  }
};

export const createFinance = async (req, res) => {
  try {
    const { nama, typeId, startDate } = req.body;
    const file = req.files.file;

    if (nama === "" || typeId === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Finances.findAll({
      attributes: ["file_name"],
    });

    const fileExt = path.extname(file.name).toLowerCase();

    const isDuplicateName = existingFiles.some(
      (existingFile) => existingFile.file_name === `${nama}${fileExt}`
    );

    if (isDuplicateName) {
      return res
        .status(400)
        .json(
          "Nama file sudah terdapat dalam database gunakan nama file yang berbeda."
        );
    }

    const maxFileSize = 5000000;

    const fileSize = file.size;

    if (fileSize > maxFileSize) {
      return res.status(400).json("File size must be less than 5MB");
    }

    const fileUrl = `file/finances/${nama}${fileExt}`;

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const twentyYearLater = new Date(date);
    twentyYearLater.setFullYear(date.getFullYear() + 20);

    await Finances.create({
      categoriesId: 6,
      typeId: typeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: date,
      end_date: twentyYearLater,
    });

    await file.mv(`./public/file/finances/${nama}${fileExt}`);

    res.status(201).json("Finance berhasil ditambahkan");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFinance = async (req, res) => {
  try {
    const { nama, typeId, file_url, startDate } = req.body;
    const file = req.files.file;

    if (nama === "" || typeId === "" || file_url === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Finances.findAll({
      attributes: ["file_name"],
    });

    const fileExt = path.extname(file.name).toLowerCase();
    const isDuplicateName = existingFiles.some(
      (existingFile) => existingFile.file_name === `${nama}${fileExt}`
    );

    if (isDuplicateName) {
      return res
        .status(400)
        .json(
          "Nama file sudah terdapat dalam database gunakan nama file yang berbeda."
        );
    }

    const maxFileSize = 5000000;
    const fileSize = file.size;

    if (fileSize > maxFileSize) {
      return res.status(400).json("File size must be less than 5MB");
    }

    const fileUrl = `file/finances/${nama}${fileExt}`;

    const previousFinances = await Finances.findByPk(req.params.id);

    if (previousFinances) {
      const previousFileUrl = `./public/${previousFinances.file_url}`;
      if (fs.existsSync(previousFileUrl)) {
        fs.unlinkSync(previousFileUrl);
      }
    }

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const twentyYearLater = new Date(date);
    twentyYearLater.setFullYear(date.getFullYear() + 20);

    await Finances.update(
      {
        categoriesId: 6,
        typeId: typeId,
        file_name: nama + fileExt,
        file_url: fileUrl,
        start_date: date,
        end_date: twentyYearLater,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await file.mv(`./public/file/finances/${nama}${fileExt}`);

    res.status(200).json("Finance berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFinance = async (req, res) => {
  try {
    const finance = await Finances.findByPk(req.params.id);
    const fileUrl = `./public/${finance.file_url}`;
    if (fs.existsSync(fileUrl)) {
      fs.unlinkSync(fileUrl);
    }
    await Finances.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Finance berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchFinance = async (req, res) => {
  try {
    const { search, typeId } = req.query;
    const finances = await Finances.findAll({
      where: {
        file_name: {
          [Op.like]: `%${search}%`,
        },
        typeId: typeId,
      },
    });
    res.status(200).json(finances);
  } catch (error) {
    console.log(error.message);
  }
};

export const filterByYears = async (req, res) => {
  try {
    const { typeId, years } = req.query;

    const startDate = `${years}-01-01`;
    const endDate = `${parseInt(years) + 1}-01-01`;

    const finances = await Finances.findAll({
      where: {
        typeId: typeId,
        start_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    res.status(200).json(finances);
  } catch (error) {
    console.log(error.message);
  }
};

export const autoDeleteFinance = async () => {
  try {
    const expiredFinances = await Finances.findAll({
      where: {
        end_date: {
          [Op.lt]: new Date(),
        },
      },
    });

    await Promise.all(
      expiredFinances.map(async (finance) => {
        const filePath = path.join("public/", finance.file_url);
        await finance.destroy();
        fs.unlinkSync(filePath);
      })
    );

    console.log("Pengecekan dan penghapusan berhasil dilakukan.");
  } catch (error) {
    console.error("Gagal melakukan pengecekan dan penghapusan:", error);
  }
};
