import ArchiveSubtypes from "../models/ArchiveSubtypeModel.js";

const insertArchiveSubtypes = async () => {
  try {
    const existingArchiveSubtypes = await ArchiveSubtypes.findAll();
    if (existingArchiveSubtypes.length === 0) {
      const ArchiveSubtypesToInsert = [
        {
          typeId: 2,
          subtype_name: "Surat Masuk",
        },
        {
          typeId: 2,
          subtype_name: "Surat Keluar",
        },
      ];
      await ArchiveSubtypes.bulkCreate(ArchiveSubtypesToInsert);
      console.log("Inserted ArchiveSubtypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting ArchiveSubtypes");
  }
};

export default insertArchiveSubtypes;
