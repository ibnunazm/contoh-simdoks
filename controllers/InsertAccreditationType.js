import AccreditationTypes from "../models/AccreditationTypeModel.js";

const insertAccreditationTypes = async () => {
  try {
    const existingAccreditationTypes = await AccreditationTypes.findAll();
    if (existingAccreditationTypes.length === 0) {
      const AccreditationTypesToInsert = [
        {
          categoriesId: 1,
          type_name: "BAB 1",
        },
        {
          categoriesId: 1,
          type_name: "BAB 2",
        },
        {
          categoriesId: 1,
          type_name: "BAB 3",
        },
        {
          categoriesId: 1,
          type_name: "BAB 4",
        },
        {
          categoriesId: 1,
          type_name: "BAB 5",
        },
      ];
      await AccreditationTypes.bulkCreate(AccreditationTypesToInsert);
      console.log("Inserted AccreditationTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting AccreditationTypes");
  }
};

export default insertAccreditationTypes;
