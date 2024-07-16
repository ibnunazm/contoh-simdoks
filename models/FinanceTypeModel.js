import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";

const FinanceTypes = db.define(
  "finance_types",
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
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

FinanceTypes.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(FinanceTypes, { foreignKey: "categoriesId" });

export default FinanceTypes;
