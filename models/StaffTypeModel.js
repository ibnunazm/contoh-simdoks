import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";

const StaffTypes = db.define(
  "staff_types",
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

StaffTypes.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(StaffTypes, { foreignKey: "categoriesId" });

export default StaffTypes;
