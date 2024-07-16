import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";

const AccreditationTypes = db.define(
  "accreditation_types",
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

AccreditationTypes.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(AccreditationTypes, { foreignKey: "categoriesId" });

export default AccreditationTypes;
