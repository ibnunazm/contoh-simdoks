import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import ProgramTypes from "./ProgramTypeModel.js";

const ProgramSubtypes = db.define(
  "program_subtypes",
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

ProgramSubtypes.belongsTo(ProgramTypes, { foreignKey: "typeId" });
ProgramTypes.hasMany(ProgramSubtypes, { foreignKey: "typeId" });

export default ProgramSubtypes;
