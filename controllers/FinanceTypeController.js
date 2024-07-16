import FinanceTypes from "../models/FinanceTypeModel.js";
import { Op } from "sequelize";

export const getFinanceTypes = async (req, res) => {
  try {
    const financeTypes = await FinanceTypes.findAll();
    res.status(200).json(financeTypes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFinanceTypeById = async (req, res) => {
  try {
    const financeType = await FinanceTypes.findByPk(req.params.id);
    res.status(200).json(financeType);
  } catch (error) {
    console.log(error.message);
  }
};

export const createFinanceType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await FinanceTypes.create({
      categoriesId: 6,
      type_name: typeName,
    });
    res.status(201).json("Finance type berhasil dibuat");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFinanceType = async (req, res) => {
  try {
    const { typeName } = req.body;
    await FinanceTypes.update(
      {
        type_name: typeName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json("Finance type berhasil diupdate");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFinanceType = async (req, res) => {
  try {
    await FinanceTypes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Finance type berhasil dihapus");
  } catch (error) {
    console.log(error.message);
  }
};

export const searchFinanceType = async (req, res) => {
  try {
    const { search } = req.query;
    const financeTypes = await FinanceTypes.findAll({
      where: {
        type_name: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.status(200).json(financeTypes);
  } catch (error) {
    console.log(error.message);
  }
};


