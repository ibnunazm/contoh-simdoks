import ItemSubtypes from "../models/ItemSubtypeModel.js";

const insertItemSubtypes = async () => {
  try {
    const existingItemSubtypes = await ItemSubtypes.findAll();
    if (existingItemSubtypes.length === 0) {
      const ItemSubtypesToInsert = [
        {
          typeId: 1,
          subtype_name: "Aset Tetap",
        },
        {
          typeId: 1,
          subtype_name: "Aset Tidak Tetap",
        },
      ];
      await ItemSubtypes.bulkCreate(ItemSubtypesToInsert);
      console.log("Inserted ItemSubtypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting ItemSubtypes");
  }
};

export default insertItemSubtypes;
