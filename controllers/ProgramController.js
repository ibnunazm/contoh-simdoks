import Programs from "../models/ProgramModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import cron from "node-cron";

export const getPrograms = async (req, res) => {
  try {
    const Programss = await Programs.findAll();
    res.status(200).json(Programss);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProgramById = async (req, res) => {
  try {
    const programs = await Programs.findByPk(req.params.id);
    res.status(200).json(programs);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProgram = async (req, res) => {
  try {
    const { nama, startDate, typeId, subtypeId } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "" || typeId === "" || subtypeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Programs.findAll({
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

    const fileUrl = `file/programs/${nama}${fileExt}`;

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const oneYearLater = new Date(date);
    oneYearLater.setFullYear(date.getFullYear() + 1);

    await Programs.create({
      categoriesId: 4,
      typeId: typeId,
      subtypeId: subtypeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: date,
      end_date: oneYearLater,
    });

    await file.mv(`./public/file/programs/${nama}${fileExt}`);

    res.status(201).json("programs berhasil ditambahkan");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProgram = async (req, res) => {
  try {
    const { nama, startDate, typeId, subtypeId } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "" || typeId === "" || subtypeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Programs.findAll({
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

    const fileUrl = `file/programs/${nama}${fileExt}`;

    const previousPrograms = await Programs.findByPk(req.params.id);

    if (previousPrograms) {
      const previousFileUrl = `./public/${previousPrograms.file_url}`;
      if (fs.existsSync(previousFileUrl)) {
        fs.unlinkSync(previousFileUrl);
      }
    }

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const oneYearLater = new Date(date);
    oneYearLater.setFullYear(date.getFullYear() + 1);

    await Programs.update(
      {
        categoriesId: 4,
        typeId: typeId,
        subtypeId: subtypeId,
        file_name: nama + fileExt,
        file_url: fileUrl,
        start_date: date,
        end_date: oneYearLater,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await file.mv(`./public/file/programs/${nama}${fileExt}`);

    res.status(200).json("Program berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const programs = await Programs.findByPk(req.params.id);
    const filePath = path.join(
      process.cwd(),
      `public/${programs.file_url}`
    );

    fs.unlink(filePath, async () => {
      await Programs.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json("Program berhasil dihapus");
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchProgram = async (req, res) => {
  try {
    const program = await Programs.findAll({
      where: {
        typeId: req.query.typeId,
        subtypeId: req.query.subtypeId,
        file_name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    });
    res.status(200).json(program);
  } catch (error) {
    console.log(error.message);
  }
};

export const filterByYears = async (req, res) => {
  try {
    const { typeId, subtypeId, years } = req.query;

    const startDate = `${years}-01-01`;
    const endDate = `${parseInt(years) + 1}-01-01`;

    const Program = await Programs.findAll({
      where: {
        typeId: typeId,
        subtypeId: subtypeId,
        start_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    res.status(200).json(Program);
  } catch (error) {
    console.log(error.message);
  }
};

export const autoDeleteProgram = async () => {
  try {
    // Ambil semua program yang end_date-nya sudah lewat
    const expiredPrograms = await Programs.findAll({
      where: {
        end_date: {
          [Op.lt]: new Date() // Kurang dari tanggal sekarang
        },
      },
    });

    // Hapus record dari database dan file dari direktori
    await Promise.all(
      expiredPrograms.map(async (program) => {
        // Hapus file dari direktori
        const filePath = path.join("public/", program.file_url);
        console.log(filePath);
        // Hapus record dari database
        await program.destroy();

        fs.unlinkSync(filePath); // Pastikan file_url adalah path lengkap ke file
      })
    );

    console.log("Pengecekan dan penghapusan berhasil dilakukan.");
  } catch (error) {
    console.error("Gagal melakukan pengecekan dan penghapusan:", error);
  }
};