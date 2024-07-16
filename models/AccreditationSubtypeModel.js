import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import AccreditationTypes from "./AccreditationTypeModel.js";

const AccreditationSubtypes = db.define(
  "accreditation_subtypes",
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

AccreditationSubtypes.belongsTo(AccreditationTypes, { foreignKey: "typeId" });
AccreditationTypes.hasMany(AccreditationSubtypes, { foreignKey: "typeId" });

export default AccreditationSubtypes;
