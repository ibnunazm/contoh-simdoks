import ItemSubtypes from "../models/ItemSubtypeModel.js";
import { Op } from "sequelize";

export const getItemSubtypes = async (req, res) => {
  try {
    const itemSubtypes = await ItemSubtypes.findAll();
    res.status(200).json(itemSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getItemSubtypeById = async (req, res) => {
  try {
    const itemSubtype = await ItemSubtypes.findByPk(req.params.id);
    res.status(200).json(itemSubtype);
  } catch (error) {
    console.log(error.message);
  }
};

export const createItemSubtype = async (req, res) => {
  try {
    const { typeId, subtypeName } = req.body;
    await ItemSubtypes.create({
      typeId: typeId,
      subtype_name: subtypeName,
    });
    res.status(201).json("Item subtype berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateItemSubtype = async (req, res) => {
  try {
    const { typeId, subtypeName } = req.body;
    await ItemSubtypes.update(
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
    res.status(200).json("Item subtype berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteItemSubtype = async (req, res) => {
  try {
    await ItemSubtypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Item subtype berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchItemSubtype = async (req, res) => {
  try {
    const { search } = req.query;
    const itemSubtypes = await ItemSubtypes.findAll({
      where: {
        subtype_name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.status(200).json(itemSubtypes);
  } catch (error) {
    console.log(error.message);
  }
};
