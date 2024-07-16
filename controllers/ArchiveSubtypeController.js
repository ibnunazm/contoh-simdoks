import ArchiveSubtypes from "../models/ArchiveSubtypeModel.js";
import { Op } from "sequelize";

export const getArchiveSubtypes = async (req, res) => {
  try {
    const archiveSubtypes = await ArchiveSubtypes.findAll();
    res.status(200).json(archiveSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getArchiveSubtypeById = async (req, res) => {
  try {
    const archiveSubtype = await ArchiveSubtypes.findByPk(req.params.id);
    res.status(200).json(archiveSubtype);
  } catch (error) {
    console.log(error.message);
  }
};

export const createArchiveSubtype = async (req, res) => {
  try {
    const { typeId, subtypeName } = req.body;
    await ArchiveSubtypes.create({
      typeId: typeId,
      subtype_name: subtypeName,
    });
    res.status(201).json("Archive subtype berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateArchiveSubtype = async (req, res) => {
  try {
    const { typeId, subtypeName } = req.body;
    await ArchiveSubtypes.update(
      {
        typeId: typeId,
        subtype_name: subtypeName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json("Archive subtype berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteArchiveSubtype = async (req, res) => {
  try {
    await ArchiveSubtypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Archive subtype berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchArchiveSubtype = async (req, res) => {
  try {
    const { search } = req.query;
    const archiveSubtypes = await ArchiveSubtypes.findAll({
      where: {
        subtype_name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.status(200).json(archiveSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};
