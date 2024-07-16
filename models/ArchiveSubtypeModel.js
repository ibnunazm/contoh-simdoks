import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import ArchiveTypes from "./ArchiveTypeModel.js";

const ArchiveSubtypes = db.define(
  "archive_subtypes",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtype_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

ArchiveSubtypes.belongsTo(ArchiveTypes, { foreignKey: "typeId" });
ArchiveTypes.hasMany(ArchiveSubtypes, { foreignKey: "typeId" });

export default ArchiveSubtypes;
