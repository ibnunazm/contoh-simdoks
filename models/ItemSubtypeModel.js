import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import ItemTypes from "./ItemTypeModel.js";

const ItemSubtypes = db.define(
  "item_subtypes",
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

ItemSubtypes.belongsTo(ItemTypes, { foreignKey: "typeId" });
ItemTypes.hasMany(ItemSubtypes, { foreignKey: "typeId" });

export default ItemSubtypes;
