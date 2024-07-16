import Tasks from "../models/TaskModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
  }
};

export const createTask = async (req, res) => {
  try {
    const { nama, startDate } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Tasks.findAll({
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

    const fileUrl = `file/tasks/${nama}${fileExt}`;

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const fiveYearsLater = new Date(date);
    fiveYearsLater.setFullYear(date.getFullYear() + 5);

    await Tasks.create({
      categoriesId: 7,
      file_name: nama + fileExt,
      start_date: date,
      file_url: fileUrl,
      end_date: fiveYearsLater,
    });

    file.mv(`./public/file/tasks/${nama}${fileExt}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    res.status(201).json("Task created successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { nama, startDate } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Tasks.findAll({
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

    const fileUrl = `file/tasks/${nama}${fileExt}`;

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const fiveYearsLater = new Date(date);
    fiveYearsLater.setFullYear(date.getFullYear() + 5);

    const oldTask = await Tasks.findByPk(req.params.id);

    await Tasks.update(
      {
        categoriesId: 7,
        file_name: nama + fileExt,
        start_date: date,
        file_url: fileUrl,
        end_date: fiveYearsLater,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    file.mv(`./public/file/tasks/${nama}${fileExt}`);
    fs.unlinkSync(`./public/${oldTask.file_url}`);

    res.status(201).json("Task updated successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    const filePath = `./public/${task.file_url}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await Tasks.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Task deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchTask = async (req, res) => {
  try {
    const { search } = req.query;
    const tasks = await Tasks.findAll({
      where: {
        file_name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
  }
};

export const filterByYears = async (req, res) => {
  try {
    const { years } = req.query;

    const startDate = `${years}-01-01`;
    const endDate = `${parseInt(years) + 1}-01-01`;

    const tasks = await Tasks.findAll({
      where: {
        start_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
  }
};

export const autoDeleteTask = async () => {
  try {
    const expiredTasks = await Tasks.findAll({
      where: {
        end_date: {
          [Op.lt]: new Date(),
        },
      },
    });

    await Promise.all(
      expiredTasks.map(async (task) => {
        const filePath = path.join("public/", task.file_url);
        await task.destroy();
        fs.unlinkSync(filePath);
      })
    );

    console.log("Pengecekan dan penghapusan berhasil dilakukan.");
  } catch (error) {
    console.error("Gagal melakukan pengecekan dan penghapusan:", error);
  }
}