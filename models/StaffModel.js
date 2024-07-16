import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";
import StaffTypes from "./StaffTypeModel.js";

const Staffs = db.define(
  "staffs",
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

Staffs.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(Staffs, { foreignKey: "categoriesId" });
Staffs.belongsTo(StaffTypes, { foreignKey: "typeId" });
StaffTypes.hasMany(Staffs, { foreignKey: "typeId" });

export default Staffs;
