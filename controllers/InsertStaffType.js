import StaffTypes from "../models/StaffTypeModel.js";

const insertStaffTypes = async () => {
  try {
    const existingStaffTypes = await StaffTypes.findAll();
    if (existingStaffTypes.length === 0) {
      const StaffTypesToInsert = [
        {
          categoriesId: 2,
          type_name: "Pimpinan",
        },
        {
          categoriesId: 2,
          type_name: "Dokter",
        },
        {
          categoriesId: 2,
          type_name: "Perawat",
        },
        {
          categoriesId: 2,
          type_name: "Bidan",
        },
        {
          categoriesId: 2,
          type_name: "Paramedis",
        },
        {
          categoriesId: 2,
          type_name: "Administrasi",
        },
        {
          categoriesId: 2,
          type_name: "Non Medis",
        },
      ];
      await StaffTypes.bulkCreate(StaffTypesToInsert);
      console.log("Inserted StaffTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting StaffTypes");
  }
};

export default insertStaffTypes;
