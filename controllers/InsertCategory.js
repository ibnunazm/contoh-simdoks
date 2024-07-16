import Category from "../models/CategoryModel.js";

const insertCategories = async () => {
  try {
    const existingCategories = await Category.findAll();
    if (existingCategories.length === 0) {
      const categoriesToInsert = [
        {
          category_name: "Akreditasi",
          barcode_url: "http://localhost:3000/Accreditations",
          deletion_system: "Manual",
        },
        {
          category_name: "Kepegawaian",
          barcode_url: "http://localhost:3000/kepegawaian",
          deletion_system: "Manual",
        },
        {
          category_name: "Barang",
          barcode_url: "http://localhost:3000/barang",
          validity_period: 5,
          deletion_system: "Otomatis",
        },
        {
          category_name: "Program",
          barcode_url: "http://localhost:3000/program",
          validity_period: 1,
          deletion_system: "Otomatis",
        },
        {
          category_name: "Surat",
          barcode_url: "http://localhost:3000/surat",
          validity_period: 5,
          deletion_system: "Otomatis",
        },
        {
          category_name: "Keuangan",
          barcode_url: "http://localhost:3000/keuangan",
          validity_period: 20,
          deletion_system: "Otomatis",
        },
        {
          category_name: "Surat Tugas",
          barcode_url: "http://localhost:3000/tugas",
          validity_period: 5,
          deletion_system: "Otomatis",
        },
      ];
      await Category.bulkCreate(categoriesToInsert);
      console.log("Inserted categories successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting categories");
  }
};

export default insertCategories;
