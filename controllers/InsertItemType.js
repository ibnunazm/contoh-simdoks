import ItemTypes from "../models/ItemTypeModel.js";

const insertItemTypes = async () => {
  try {
    const existingItemTypes = await ItemTypes.findAll();
    if (existingItemTypes.length === 0) {
      const ItemTypesToInsert = [
        {
          categoriesId: 3,
          type_name: "Aset",
        },
        {
          categoriesId: 3,
          type_name: "Persediaan",
        },
      ];
      await ItemTypes.bulkCreate(ItemTypesToInsert);
      console.log("Inserted ItemTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting ItemTypes");
  }
};

export default insertItemTypes;
