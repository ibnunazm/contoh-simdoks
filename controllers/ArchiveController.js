import Archives from "../models/ArchiveModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getArchives = async (req, res) => {
  try {
    const Archive = await Archives.findAll();
    res.status(200).json(Archive);
  } catch (error) {
    console.log(error.message);
  }
};

export const getArchiveById = async (req, res) => {
  try {
    const archive = await Archives.findByPk(req.params.id);
    res.status(200).json(archive);
  } catch (error) {
    console.log(error.message);
  }
};

export const createArchive = async (req, res) => {
  try {
    const { nama, typeId, subtypeId, startDate } = req.body;
    const file = req.files.file;

    if (nama === "" || typeId === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Archives.findAll({
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

    const fileUrl = `file/archives/${nama}${fileExt}`;

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const fiveYearsLater = new Date(date);
    fiveYearsLater.setFullYear(date.getFullYear() + 5);

    await Archives.create({
      categoriesId: 5,
      typeId: typeId,
      subtypeId: subtypeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: date,
      end_date: fiveYearsLater,
    });

    await file.mv(`./public/file/archives/${nama}${fileExt}`);

    res.status(201).json("Archive berhasil ditambahkan");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateArchive = async (req, res) => {
  try {
    const { nama, startDate, typeId, subtypeId } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "" || typeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Archives.findAll({
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

    const fileUrl = `file/archives/${nama}${fileExt}`;

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const fiveYearsLater = new Date(date);
    fiveYearsLater.setFullYear(date.getFullYear() + 5);

    const oldArchive = await Archives.findByPk(req.params.id);

    await Archives.update(
      {
        categoriesId: 5,
        typeId: typeId,
        subtypeId: subtypeId,
        file_name: nama + fileExt,
        file_url: fileUrl,
        start_date: date,
        end_date: fiveYearsLater,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await file.mv(`./public/file/archives/${nama}${fileExt}`);
    fs.unlinkSync(`./public/${oldArchive.file_url}`);

    res.status(200).json("Archive berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteArchive = async (req, res) => {
  try {
    const archive = await Archives.findByPk(req.params.id);
    const fileUrl = `./public/${archive.file_url}`;
    if (fs.existsSync(fileUrl)) {
      fs.unlinkSync(fileUrl);
    }
    await Archives.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Archive berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const getArchivesBySubtypeId = async (req, res) => {
  try {
    const { subtypeId, typeId } = req.body;
    let archives = "";
    if (subTypeId) {
      archives = await Archives.findAll({
        where: {
          subtypeId: subtypeId,
          typeId: typeId,
        },
      });
    } else {
      archives = await Archives.findAll({
        where: {
          typeId: typeId,
        },
      });
    }
    res.status(200).json(archives);
  } catch (error) {
    console.log(error.message);
  }
};

export const filterByYears = async (req, res) => {
  try {
    const { typeId, subtypeId, years } = req.query;
    let archives = "";
    if (subtypeId) {
      archives = await Archives.findAll({
        where: {
          typeId: typeId,
          subtypeId: subtypeId,
          start_date: {
            [Op.between]: [`${years}-01-01`, `${years}-12-31`],
          },
        },
      });
    } else {
      archives = await Archives.findAll({
        where: {
          typeId: typeId,
          start_date: {
            [Op.between]: [`${years}-01-01`, `${years}-12-31`],
          },
        },
      });
    }
    res.status(200).json(archives);
  } catch (error) {
    console.log(error.message);
  }
};

export const searchArchive = async (req, res) => {
  try {
    const { search, typeId, subtypeId } = req.query;
    let archives = "";
    if (subtypeId) {
      archives = await Archives.findAll({
        where: {
          file_name: {
            [Op.like]: `%${search}%`,
          },
          typeId: typeId,
          subtypeId: subtypeId,
        },
      });
    } else {
      archives = await Archives.findAll({
        where: {
          file_name: {
            [Op.like]: `%${search}%`,
          },
          typeId: typeId,
        },
      });
    }
    res.status(200).json(archives);
  } catch (error) {
    console.log(error.message);
  }
};

export const autoDeleteArchive = async () => {
  try {
    const expiredArchives = await Archives.findAll({
      where: {
        end_date: {
          [Op.lt]: new Date(),
        },
      },
    });

    await Promise.all(
      expiredArchives.map(async (archive) => {
        const filePath = path.join("public/", archive.file_url);
        await archive.destroy();
        fs.unlinkSync(filePath);
      })
    );

    console.log("Pengecekan dan penghapusan berhasil dilakukan.");
  } catch (error) {
    console.error("Gagal melakukan pengecekan dan penghapusan:", error);
  }
};
