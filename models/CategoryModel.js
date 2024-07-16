import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";

const Categories = db.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barcode_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    validity_period: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletion_system: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Categories;
