import AccreditationTypes from "../models/AccreditationTypeModel.js";
import { Op } from "sequelize";

export const getAccreditationTypes = async (req, res) => {
  try {
    const accreditationTypes = await AccreditationTypes.findAll();
    res.status(200).json(accreditationTypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAccreditationTypeById = async (req, res) => {
  try {
    const accreditationType = await AccreditationTypes.findByPk(req.params.id);
    res.status(200).json(accreditationType);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAccreditationType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await AccreditationTypes.create({
      categoriesId: 1,
      type_name: typeName,
    });
    res.status(201).json("Accreditation type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAccreditationType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await AccreditationTypes.update(
      {
        type_name: typeName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json("Accreditation type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAccreditationType = async (req, res) => {
  try {
    await AccreditationTypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Accreditation type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchAccreditationType = async (req, res) => {
  try {
    const accreditationType = await AccreditationTypes.findAll({
      where: {
        type_name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    });
    res.status(200).json(accreditationType);
  } catch (error) {
    console.log(error.message);
  }
};
