import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import fileUpload from "express-fileupload";
import UserRoute from "./routes/UserRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import AccreditationRoute from "./routes/AccreditationRoute.js";
import AccreditationTypeRoute from "./routes/AccreditationTypeRoute.js";
import AccreditationSubtypeRoute from "./routes/AccreditationSubtypeRoute.js";
import StaffRoute from "./routes/StaffRoute.js";
import StaffTypeRoute from "./routes/StaffTypeRoute.js";
import ProgramRoute from "./routes/ProgramRoute.js";
import ProgramTypeRoute from "./routes/ProgramTypeRoute.js";
import ProgramSubtypeRoute from "./routes/ProgramSubtypeRoute.js";
import FinanceRoute from "./routes/FinanceRoute.js";
import FinanceTypeRoute from "./routes/FinanceTypeRoute.js";
import TaskRoute from "./routes/TaskRoute.js";
import ArchiveRoute from "./routes/ArchiveRoute.js";
import ArchiveTypeRoute from "./routes/ArchiveTypeRoute.js";
import ArchiveSubtypeRoute from "./routes/ArchiveSubtypeRoute.js";
import ItemRoute from "./routes/ItemRoute.js";
import ItemTypeRoute from "./routes/ItemTypeRoute.js";
import ItemSubtypeRoute from "./routes/ItemSubtypeRoute.js";
import GetFileRoute from "./routes/GetFileRoute.js";
import HistoryRoute from "./routes/HistoryRoute.js";

import insertUsers from "./controllers/InsertUser.js";
import insertCategories from "./controllers/InsertCategory.js";
import insertAccreditationTypes from "./controllers/InsertAccreditationType.js";
import insertAccreditationSubtypes from "./controllers/InsertAccreditationSubtype.js";
import insertStaffTypes from "./controllers/InsertStaffType.js";
import insertProgramTypes from "./controllers/InsertProgramType.js";
import insertProgramSubtypes from "./controllers/InsertProgramSubtype.js";
import insertFinanceTypes from "./controllers/InsertFinanceType.js";
import insertArchiveTypes from "./controllers/InsertArchiveType.js";
import insertArchiveSubtypes from "./controllers/InsertArchiveSubtype.js";
import insertItemTypes from "./controllers/InsertItemType.js";
import insertItemSubtypes from "./controllers/InsertItemSubtype.js";

import cron from "node-cron";
import { autoDeleteProgram } from "./controllers/ProgramController.js";
import { autoDeleteItem } from "./controllers/ItemController.js";
import { autoDeleteArchive } from "./controllers/ArchiveController.js";
import { autoDeleteTask } from "./controllers/TaskController.js";
import { autoDeleteFinance } from "./controllers/FinanceController.js";

const port = 8000;

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(CategoryRoute);
app.use(AccreditationRoute);
app.use(AccreditationTypeRoute);
app.use(AccreditationSubtypeRoute);
app.use(StaffRoute);
app.use(StaffTypeRoute);
app.use(ProgramRoute);
app.use(ProgramTypeRoute);
app.use(ProgramSubtypeRoute);
app.use(FinanceRoute);
app.use(FinanceTypeRoute);
app.use(TaskRoute);
app.use(ArchiveRoute);
app.use(ArchiveTypeRoute);
app.use(ArchiveSubtypeRoute);
app.use(ItemRoute);
app.use(ItemTypeRoute);
app.use(ItemSubtypeRoute);
app.use(GetFileRoute);
app.use(HistoryRoute);

// Jalankan cron job setiap jam 00.02.00
const autoDelete = cron.schedule(
  "2 0 * * *",
  async () => {
    await autoDeleteProgram();
    await autoDeleteItem();
    await autoDeleteArchive();
    await autoDeleteTask();
    await autoDeleteFinance();
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);

(async () => {
  await db.authenticate();
  await db.sync();
  await insertCategories();
  await insertUsers();
  await insertAccreditationTypes();
  await insertAccreditationSubtypes();
  await insertStaffTypes();
  await insertProgramTypes();
  await insertProgramSubtypes();
  await insertFinanceTypes();
  await insertArchiveTypes();
  await insertArchiveSubtypes();
  await insertItemTypes();
  await insertItemSubtypes();
})();

autoDelete.start();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is listening on port " + port + "...");
});
