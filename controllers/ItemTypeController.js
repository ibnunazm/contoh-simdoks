import ItemTypes from "../models/ItemTypeModel.js";
import { Op } from "sequelize";

export const getItemTypes = async (req, res) => {
  try {
    const itemTypes = await ItemTypes.findAll();
    res.status(200).json(itemTypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getItemTypeById = async (req, res) => {
  try {
    const itemType = await ItemTypes.findByPk(req.params.id);
    res.status(200).json(itemType);
  } catch (error) {
    console.log(error.message);
  }
};

export const createItemType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await ItemTypes.create({
      categoriesId: 3,
      type_name: typeName,
    });
    res.status(201).json("Item type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateItemType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await ItemTypes.update(
      {
        categoriesId: 3,
        type_name: typeName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json("Item type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteItemType = async (req, res) => {
  try {
    await ItemTypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Item type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchItemType = async (req, res) => {
  try {
    const { search } = req.query;
    const itemTypes = await ItemTypes.findAll({
      where: {
        type_name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.status(200).json(itemTypes);
  } catch (error) {
    console.log(error.message);
  }
};
