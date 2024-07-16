import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";
import ItemTypes from "./ItemTypeModel.js";
import ItemSubtypes from "./ItemSubtypeModel.js";

const Items = db.define(
  "items",
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

Items.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(Items, { foreignKey: "categoriesId" });
Items.belongsTo(ItemTypes, { foreignKey: "typeId" });
ItemTypes.hasMany(Items, { foreignKey: "typeId" });
Items.belongsTo(ItemSubtypes, {
  foreignKey: "subtypeId",
  onDelete: "SET NULL",
});

export default Items;
