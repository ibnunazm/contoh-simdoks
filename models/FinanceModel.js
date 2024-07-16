import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";
import FinanceTypes from "./FinanceTypeModel.js";

const Finances = db.define(
  "finances",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoriesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Finances.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(Finances, { foreignKey: "categoriesId" });
Finances.belongsTo(FinanceTypes, { foreignKey: "typeId" });
FinanceTypes.hasMany(Finances, { foreignKey: "typeId" });

export default Finances;
