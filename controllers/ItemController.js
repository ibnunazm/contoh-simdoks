import Items from "../models/ItemModel.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getItems = async (req, res) => {
  try {
    const Item = await Items.findAll();
    res.status(200).json(Item);
  } catch (error) {
    console.log(error.message);
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    console.log(error.message);
  }
};

export const createItem = async (req, res) => {
  try {
    const { nama, typeId, subtypeId, startDate } = req.body;
    const file = req.files.file;

    if (nama === "" || typeId === "" || startDate === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Items.findAll({
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

    const fileUrl = `file/items/${nama}${fileExt}`;

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const fiveYearsLater = new Date(date);
    fiveYearsLater.setFullYear(date.getFullYear() + 5);

    await Items.create({
      categoriesId: 3,
      typeId: typeId,
      subtypeId: subtypeId,
      file_name: nama + fileExt,
      file_url: fileUrl,
      start_date: date,
      end_date: fiveYearsLater,
    });

    await file.mv(`./public/file/items/${nama}${fileExt}`);

    res.status(201).json("Item berhasil ditambahkan");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateItem = async (req, res) => {
  try {
    const { nama, startDate, typeId, subtypeId } = req.body;
    const file = req.files.file;

    if (nama === "" || startDate === "" || typeId === "") {
      return res.status(400).json("Semua field harus diisi");
    }

    const existingFiles = await Items.findAll({
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

    const fileUrl = `file/items/${nama}${fileExt}`;

    const date = new Date(startDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const fiveYearsLater = new Date(date);
    fiveYearsLater.setFullYear(date.getFullYear() + 5);
    const oldItem = await Items.findByPk(req.params.id);

    await Items.update(
      {
        categoriesId: 3,
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

    await file.mv(`./public/file/items/${nama}${fileExt}`);
    fs.unlinkSync(`./public/${oldItem.file_url}`);

    res.status(200).json("Item berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id);
    const fileUrl = `./public/${item.file_url}`;
    if (fs.existsSync(fileUrl)) {
      fs.unlinkSync(fileUrl);
    }
    await Items.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Item berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const getItemsBySubtypeId = async (req, res) => {
  try {
    const { subtypeId, typeId } = req.body;
    let items = "";
    if (subTypeId) {
      items = await Items.findAll({
        where: {
          subtypeId: subtypeId,
          typeId: typeId,
        },
      });
    } else {
      items = await Items.findAll({
        where: {
          typeId: typeId,
        },
      });
    }
    res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
  }
};

export const filterByYears = async (req, res) => {
  try {
    const { typeId, subtypeId, years } = req.query;
    let items = "";
    if (subtypeId) {
      items = await Items.findAll({
        where: {
          typeId: typeId,
          subtypeId: subtypeId,
          start_date: {
            [Op.between]: [`${years}-01-01`, `${years}-12-31`],
          },
        },
      });
    } else {
      items = await Items.findAll({
        where: {
          typeId: typeId,
          start_date: {
            [Op.between]: [`${years}-01-01`, `${years}-12-31`],
          },
        },
      });
    }
    res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
  }
};

export const searchItem = async (req, res) => {
  try {
    const { search, typeId, subtypeId } = req.query;
    let items = "";
    if (subtypeId) {
      items = await Items.findAll({
        where: {
          file_name: {
            [Op.like]: `%${search}%`,
          },
          typeId: typeId,
          subtypeId: subtypeId,
        },
      });
    } else {
      items = await Items.findAll({
        where: {
          file_name: {
            [Op.like]: `%${search}%`,
          },
          typeId: typeId,
        },
      });
    }
    res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
  }
};

export const autoDeleteItem = async () => {
  try {
    const expiredItems = await Items.findAll({
      where: {
        end_date: {
          [Op.lt]: new Date(),
        },
      },
    });

    await Promise.all(
      expiredItems.map(async (item) => {
        const filePath = path.join("public/", item.file_url);
        await item.destroy();
        fs.unlinkSync(filePath);
      })
    );

    console.log("Pengecekan dan penghapusan berhasil dilakukan.");
  } catch (error) {
    console.error("Gagal melakukan pengecekan dan penghapusan:", error);
  }
};
