import StaffTypes from "../models/StaffTypeModel.js";
import { Op } from "sequelize";

export const getStaffTypes = async (req, res) => {
  try {
    const staffTypes = await StaffTypes.findAll();
    res.status(200).json(staffTypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getStaffTypeById = async (req, res) => {
  try {
    const staffType = await StaffTypes.findByPk(req.params.id);
    res.status(200).json(staffType);
  } catch (error) {
    console.log(error.message);
  }
};

export const createStaffType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await StaffTypes.create({
      categoriesId: 2,
      type_name: typeName,
    });
    res.status(201).json("Staff type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStaffType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await StaffTypes.update(
      {
        type_name: typeName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json("Staff type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStaffType = async (req, res) => {
  try {
    await StaffTypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Staff type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchStaffType = async (req, res) => {
  try {
    const staffType = await StaffTypes.findAll({
      where: {
        type_name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
    });
    res.status(200).json(staffType);
  } catch (error) {
    console.log(error.message);
  }
};
