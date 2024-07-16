import AccreditationSubtypes from "../models/AccreditationSubtypeModel.js";
import { Op } from "sequelize";

export const getAccreditationSubtypes = async (req, res) => {
  try {
    const accreditationSubtypes = await AccreditationSubtypes.findAll();
    res.status(200).json(accreditationSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAccreditationSubtypeById = async (req, res) => {
  try {
    const accreditationSubtype = await AccreditationSubtypes.findByPk(
      req.params.id
    );
    res.status(200).json(accreditationSubtype);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAccreditationSubtype = async (req, res) => {
  try {
    const { typeId, subtypeName } = req.body;
    await AccreditationSubtypes.create({
      typeId: typeId,
      subtype_name: subtypeName,
    });
    res.status(201).json("Accreditation subtype berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAccreditationSubtype = async (req, res) => {
  try {
    const { typeId, subtypeName } = req.body;
    await AccreditationSubtypes.update(
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
    res.status(200).json("Accreditation subtype berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAccreditationSubtype = async (req, res) => {
  try {
    await AccreditationSubtypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Accreditation subtype berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchAccreditationSubtype = async (req, res) => {
  try {
    const accreditationSubtype = await AccreditationSubtypes.findAll({
      where: {
        typeId: req.query.typeId,
        subtype_name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    });
    res.status(200).json(accreditationSubtype);
  } catch (error) {
    console.log(error.message);
  }
};