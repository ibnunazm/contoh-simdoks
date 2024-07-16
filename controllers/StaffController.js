import Staffs from "../models/StaffModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getStaffs = async (req, res) => {
  try {
    const staffs = await Staffs.findAll();
    res.status(200).json(staffs);
  } catch (error) {
    console.log(error.message);
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await Staffs.findByPk(req.params.id);
    res.status(200).json(staff);
  } catch (error) {
    console.log(error.message);
  }
};

export const createStaff = async (req, res) => {
  try {
    const { nama, startDate, typeId } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "" || typeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Staffs.findAll({
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

    const fileUrl = `file/staffs/${nama}${fileExt}`;

    await Staffs.create({
      categoriesId: 2,
      typeId: typeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: startDate,
    });

    await file.mv(`./public/file/staffs/${nama}${fileExt}`);

    res.status(201).json("Staff berhasil ditambahkan");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { nama, startDate, typeId } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "" || typeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Staffs.findAll({
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

    const fileUrl = `file/staffs/${nama}${fileExt}`;

    const previousStaffs = await Staffs.findByPk(req.params.id);

    if (previousStaffs) {
      const previousFileUrl = `./public/${previousStaffs.file_url}`;
      if (fs.existsSync(previousFileUrl)) {
        fs.unlinkSync(previousFileUrl);
      }
    }

    await Staffs.update(
      {
        categoriesId: 2,
        typeId: typeId,
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

    await file.mv(`./public/file/staffs/${nama}${fileExt}`);

    res.status(200).json("Staff berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staffs = await Staffs.findByPk(req.params.id);
    const filePath = path.join(process.cwd(), `public/${staffs.file_url}`);

    fs.unlink(filePath, async () => {
      await Staffs.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json("Staff berhasil dihapus");
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchStaff = async (req, res) => {
  try {
    const staff = await Staffs.findAll({
      where: {
        typeId: req.query.typeId,
        file_name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    });
    res.status(200).json(staff);
  } catch (error) {
    console.log(error.message);
  }
};

export const filterByYears = async (req, res) => {
    try {
      const { typeId, years } = req.query;
      
      const startDate = `${years}-01-01`;
      const endDate = `${parseInt(years) + 1}-01-01`;
  
      const staff = await Staffs.findAll({
        where: {
          typeId: typeId,
          start_date: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      res.status(200).json(staff);
    } catch (error) {
    console.log(error.message);
  }
};
