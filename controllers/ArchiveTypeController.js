import ArchiveTypes from "../models/ArchiveTypeModel.js";
import { Op } from "sequelize";

export const getArchiveTypes = async (req, res) => {
  try {
    const archiveTypes = await ArchiveTypes.findAll();
    res.status(200).json(archiveTypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getArchiveTypeById = async (req, res) => {
  try {
    const archiveType = await ArchiveTypes.findByPk(req.params.id);
    res.status(200).json(archiveType);
  } catch (error) {
    console.log(error.message);
  }
};

export const createArchiveType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await ArchiveTypes.create({
      categoriesId: 5,
      type_name: typeName,
    });
    res.status(201).json("Archive type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateArchiveType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await ArchiveTypes.update(
      {
        type_name: typeName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json("Archive type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteArchiveType = async (req, res) => {
  try {
    await ArchiveTypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Archive type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchArchiveType = async (req, res) => {
  try {
    const { search } = req.query;
    const archiveTypes = await ArchiveTypes.findAll({
      where: {
        type_name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.status(200).json(archiveTypes);
  } catch (error) {
    console.log(error.message);
  }
};