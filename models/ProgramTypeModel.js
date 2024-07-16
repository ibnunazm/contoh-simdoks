import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";

const ProgramTypes = db.define(
  "program_types",
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

ProgramTypes.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(ProgramTypes, { foreignKey: "categoriesId" });

export default ProgramTypes;
