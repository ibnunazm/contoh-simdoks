import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoryModel.js";

const ItemTypes = db.define(
  "item_types",
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

ItemTypes.belongsTo(Categories, { foreignKey: "categoriesId" });
Categories.hasMany(ItemTypes, { foreignKey: "categoriesId" });

export default ItemTypes;
