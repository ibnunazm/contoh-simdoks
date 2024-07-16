import ArchiveTypes from "../models/ArchiveTypeModel.js";

const insertArchiveTypes = async () => {
  try {
    const existingArchiveTypes = await ArchiveTypes.findAll();
    if (existingArchiveTypes.length === 0) {
      const ArchiveTypesToInsert = [
        {
          categoriesId: 5,
          type_name: "Arsip Statis",
        },
        {
          categoriesId: 5,
          type_name: "Arsip Dinamis",
        },
      ];
      await ArchiveTypes.bulkCreate(ArchiveTypesToInsert);
      console.log("Inserted ArchiveTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting AccreditationTypes");
  }
};

export default insertArchiveTypes;
