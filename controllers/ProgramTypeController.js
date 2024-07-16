import ProgramTypes from "../models/ProgramTypeModel.js";
import { Op } from "sequelize";

export const getProgramTypes = async (req, res) => {
  try {
    const programTypes = await ProgramTypes.findAll();
    res.status(200).json(programTypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProgramTypeById = async (req, res) => {
  try {
    const programType = await ProgramTypes.findByPk(req.params.id);
    res.status(200).json(programType);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProgramType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await ProgramTypes.create({
      categoriesId: 4,
      type_name: typeName,
    });
    res.status(201).json("Program type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProgramType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await ProgramTypes.update(
      {
        type_name: typeName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json("Program type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProgramType = async (req, res) => {
  try {
    await ProgramTypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Program type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchProgramType = async (req, res) => {
  try {
    const programType = await ProgramTypes.findAll({
      where: {
        type_name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    });
    res.status(200).json(programType);
  } catch (error) {
    console.log(error.message);
  }
};
