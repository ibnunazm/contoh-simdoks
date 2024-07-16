import Accreditations from "../models/AccreditationModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getAccreditations = async (req, res) => {
  try {
    const Accreditationss = await Accreditations.findAll();
    res.status(200).json(Accreditationss);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAccreditationById = async (req, res) => {
  try {
    const accreditations = await Accreditations.findByPk(req.params.id);
    res.status(200).json(accreditations);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAccreditation = async (req, res) => {
  try {
    const { nama, startDate, typeId, subtypeId } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "" || typeId === "" || subtypeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Accreditations.findAll({
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

    const fileUrl = `file/accreditations/${nama}${fileExt}`;

    await Accreditations.create({
      categoriesId: 1,
      typeId: typeId,
      subtypeId: subtypeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: startDate,
    });

    await file.mv(`./public/file/accreditations/${nama}${fileExt}`);

    res.status(201).json("Accreditation berhasil ditambahkan");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAccreditation = async (req, res) => {
  try {
    const { nama, startDate, typeId, subtypeId } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "" || typeId === "" || subtypeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Accreditations.findAll({
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

    const fileUrl = `file/accreditations/${nama}${fileExt}`;

    const previousAccreditations = await Accreditations.findByPk(req.params.id);

    if (previousAccreditations) {
      const previousFileUrl = `./public/${previousAccreditations.file_url}`;
      if (fs.existsSync(previousFileUrl)) {
        fs.unlinkSync(previousFileUrl);
      }
    }

    await Accreditations.update(
      {
        categoriesId: 1,
        typeId: typeId,
        subtypeId: subtypeId,
        file_name: nama + fileExt,
        file_url: fileUrl,
        start_date: startDate,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await file.mv(`./public/file/accreditations/${nama}${fileExt}`);

    res.status(200).json("Accreditation berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAccreditation = async (req, res) => {
  try {
    const accreditations = await Accreditations.findByPk(req.params.id);
    const filePath = path.join(
      process.cwd(),
      `public/${accreditations.file_url}`
    );

    fs.unlink(filePath, async () => {
      await Accreditations.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json("Accreditation berhasil dihapus");
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchAccreditation = async (req, res) => {
  try {
    const accreditation = await Accreditations.findAll({
      where: {
        typeId: req.query.typeId,
        subtypeId: req.query.subtypeId,
        file_name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    });
    res.status(200).json(accreditation);
  } catch (error) {
    console.log(error.message);
  }
};

export const filterByYears = async (req, res) => {
  try {
    const { typeId, subtypeId, years } = req.query;

    const startDate = `${years}-01-01`;
    const endDate = `${parseInt(years) + 1}-01-01`;

    const accreditation = await Accreditations.findAll({
      where: {
        typeId: typeId,
        start_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    res.status(200).json(accreditation);
  } catch (error) {
    console.log(error.message);
  }
};
