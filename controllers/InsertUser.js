import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

const insertUsers = async () => {
  try {
    const existingUsers = await User.findAll();
    const salt = await bcrypt.genSalt();
    if (existingUsers.length === 0) {
      const UsersToInsert = [
        {
          username: "ibnua11",
          password: await bcrypt.hash("ibnua11", salt),
          role: "leader",
        },
        {
          username: "leader",
          password: await bcrypt.hash("leader", salt),
          role: "leader",
        },
        {
          username: "Akreditasi",
          password: await bcrypt.hash("akreditasi", salt),
          role: "staff akreditasi",
        },
        {
          username: "barang",
          password: await bcrypt.hash("barang", salt),
          role: "staff barang",
        },
        {
          username: "kepegawaian",
          password: await bcrypt.hash("kepegawaian", salt),
          role: "staff kepegawaian",
        },
        {
          username: "program",
          password: await bcrypt.hash("program", salt),
          role: "staff program",
        },
        {
          username: "surat",
          password: await bcrypt.hash("surat", salt),
          role: "staff surat",
        },
        {
          username: "keuangan",
          password: await bcrypt.hash("keuangan", salt),
          role: "staff keuangan",
        },
        {
          username: "tugas",
          password: await bcrypt.hash("tugas", salt),
          role: "staff tugas",
        },
      ];
      await User.bulkCreate(UsersToInsert);
      console.log("Inserted users successfully");
    }
  } catch (error) {
    console.error("Error bulk inserting users");
  }
};

export default insertUsers;
