import ProgramTypes from "../models/ProgramTypeModel.js";

const insertProgramTypes = async () => {
  try {
    const existingProgramTypes = await ProgramTypes.findAll();
    if (existingProgramTypes.length === 0) {
      const ProgramTypesToInsert = [
        {
          categoriesId: 4,
          type_name: "Esensial",
        },
        {
          categoriesId: 4,
          type_name: "Upaya Kesehatan Pengembangan",
        },
        {
          categoriesId: 4,
          type_name: "Upaya Kesehatan Perorangan",
        }
      ];
      await ProgramTypes.bulkCreate(ProgramTypesToInsert);
      console.log("Inserted ProgramTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting ProgramTypes");
  }
};

export default insertProgramTypes;
