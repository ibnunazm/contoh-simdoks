import ProgramSubtypes from "../models/ProgramSubtypeModel.js";
import { Op } from "sequelize";

export const getProgramSubtypes = async (req, res) => {
  try {
    const programSubtypes = await ProgramSubtypes.findAll();
    res.status(200).json(programSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProgramSubtypeById = async (req, res) => {
  try {
    const programSubtype = await ProgramSubtypes.findByPk(
      req.params.id
    );
    res.status(200).json(programSubtype);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProgramSubtype = async (req, res) => {
  try {
    const { typeId, subtypeName } = req.body;
    await ProgramSubtypes.create({
      typeId: typeId,
      subtype_name: subtypeName,
    });
    res.status(201).json("Program subtype berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProgramSubtype = async (req, res) => {
  try {
    const { typeId, subtypeName } = req.body;
    await ProgramSubtypes.update(
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
    res.status(200).json("Program subtype berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProgramSubtype = async (req, res) => {
  try {
    await ProgramSubtypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Program subtype berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchProgramSubtype = async (req, res) => {
  try {
    const programSubtype = await ProgramSubtypes.findAll({
      where: {
        typeId: req.query.typeId,
        subtype_name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    });
    res.status(200).json(programSubtype);
  } catch (error) {
    console.log(error.message);
  }
};