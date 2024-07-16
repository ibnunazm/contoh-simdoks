import FinanceTypes from "../models/FinanceTypeModel.js";

const insertFinanceTypes = async () => {
  try {
    const existingFinanceTypes = await FinanceTypes.findAll();
    if (existingFinanceTypes.length === 0) {
      const FinanceTypesToInsert = [
        {
          categoriesId: 6,
          type_name: "Sumber Dana DAK",
        },
        {
          categoriesId: 6,
          type_name: "BLUD Penerima",
        },
        {
          categoriesId: 6,
          type_name: "BLUD Pengeluaran",
        },
      ];
      await FinanceTypes.bulkCreate(FinanceTypesToInsert);
      console.log("Inserted FinanceTypes successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting FinanceTypes");
  }
};

export default insertFinanceTypes;
