import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";
import ProgramTypes from "./ProgramTypeModel.js";
import ProgramSubtypes from "./ProgramSubtypeModel.js";

const Programs = db.define(
  "programs",
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
    subtypeId: {
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

Programs.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(Programs, { foreignKey: "categoriesId" });
Programs.belongsTo(ProgramTypes, { foreignKey: "typeId" });
ProgramTypes.hasMany(Programs, { foreignKey: "typeId" });
Programs.belongsTo(ProgramSubtypes, { foreignKey: "subtypeId" });
ProgramSubtypes.hasMany(Programs, { foreignKey: "subtypeId" });

export default Programs;
