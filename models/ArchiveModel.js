import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";
import ArchiveTypes from "./ArchiveTypeModel.js";
import ArchiveSubtypes from "./ArchiveSubtypeModel.js";

const Archives = db.define(
  "archives",
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
      allowNull: true,
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

Archives.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(Archives, { foreignKey: "categoriesId" });
Archives.belongsTo(ArchiveTypes, { foreignKey: "typeId" });
ArchiveTypes.hasMany(Archives, { foreignKey: "typeId" });
Archives.belongsTo(ArchiveSubtypes, {
  foreignKey: "subtypeId",
  onDelete: "SET NULL",
});

export default Archives;
