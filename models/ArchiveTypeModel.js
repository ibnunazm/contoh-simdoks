import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";

const ArchiveTypes = db.define(
  "archive_types",
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

ArchiveTypes.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(ArchiveTypes, { foreignKey: "categoriesId" });

export default ArchiveTypes;
