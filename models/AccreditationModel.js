import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";
import AccreditationTypes from "./AccreditationTypeModel.js";
import AccreditationSubtypes from "./AccreditationSubtypeModel.js";

const Accreditations = db.define(
  "accreditations",
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
  },
  {
    freezeTableName: true,
  }
);

Accreditations.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(Accreditations, { foreignKey: "categoriesId" });
Accreditations.belongsTo(AccreditationTypes, { foreignKey: "typeId" });
AccreditationTypes.hasMany(Accreditations, { foreignKey: "typeId" });
Accreditations.belongsTo(AccreditationSubtypes, { foreignKey: "subtypeId" });
AccreditationSubtypes.hasMany(Accreditations, { foreignKey: "subtypeId" });

export default Accreditations;
