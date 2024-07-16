"use strict";

require("core-js/modules/es.promise.js");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _database = _interopRequireDefault(require("./config/database.js"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _UserRoute = _interopRequireDefault(require("./routes/UserRoute.js"));
var _CategoryRoute = _interopRequireDefault(require("./routes/CategoryRoute.js"));
var _AccreditationRoute = _interopRequireDefault(require("./routes/AccreditationRoute.js"));
var _AccreditationTypeRoute = _interopRequireDefault(require("./routes/AccreditationTypeRoute.js"));
var _AccreditationSubtypeRoute = _interopRequireDefault(require("./routes/AccreditationSubtypeRoute.js"));
var _StaffRoute = _interopRequireDefault(require("./routes/StaffRoute.js"));
var _StaffTypeRoute = _interopRequireDefault(require("./routes/StaffTypeRoute.js"));
var _ProgramRoute = _interopRequireDefault(require("./routes/ProgramRoute.js"));
var _ProgramTypeRoute = _interopRequireDefault(require("./routes/ProgramTypeRoute.js"));
var _ProgramSubtypeRoute = _interopRequireDefault(require("./routes/ProgramSubtypeRoute.js"));
var _FinanceRoute = _interopRequireDefault(require("./routes/FinanceRoute.js"));
var _FinanceTypeRoute = _interopRequireDefault(require("./routes/FinanceTypeRoute.js"));
var _TaskRoute = _interopRequireDefault(require("./routes/TaskRoute.js"));
var _ArchiveRoute = _interopRequireDefault(require("./routes/ArchiveRoute.js"));
var _ArchiveTypeRoute = _interopRequireDefault(require("./routes/ArchiveTypeRoute.js"));
var _ArchiveSubtypeRoute = _interopRequireDefault(require("./routes/ArchiveSubtypeRoute.js"));
var _ItemRoute = _interopRequireDefault(require("./routes/ItemRoute.js"));
var _ItemTypeRoute = _interopRequireDefault(require("./routes/ItemTypeRoute.js"));
var _ItemSubtypeRoute = _interopRequireDefault(require("./routes/ItemSubtypeRoute.js"));
var _GetFileRoute = _interopRequireDefault(require("./routes/GetFileRoute.js"));
var _HistoryRoute = _interopRequireDefault(require("./routes/HistoryRoute.js"));
var _InsertUser = _interopRequireDefault(require("./controllers/InsertUser.js"));
var _InsertCategory = _interopRequireDefault(require("./controllers/InsertCategory.js"));
var _InsertAccreditationType = _interopRequireDefault(require("./controllers/InsertAccreditationType.js"));
var _InsertAccreditationSubtype = _interopRequireDefault(require("./controllers/InsertAccreditationSubtype.js"));
var _InsertStaffType = _interopRequireDefault(require("./controllers/InsertStaffType.js"));
var _InsertProgramType = _interopRequireDefault(require("./controllers/InsertProgramType.js"));
var _InsertProgramSubtype = _interopRequireDefault(require("./controllers/InsertProgramSubtype.js"));
var _InsertFinanceType = _interopRequireDefault(require("./controllers/InsertFinanceType.js"));
var _InsertArchiveType = _interopRequireDefault(require("./controllers/InsertArchiveType.js"));
var _InsertArchiveSubtype = _interopRequireDefault(require("./controllers/InsertArchiveSubtype.js"));
var _InsertItemType = _interopRequireDefault(require("./controllers/InsertItemType.js"));
var _InsertItemSubtype = _interopRequireDefault(require("./controllers/InsertItemSubtype.js"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _ProgramController = require("./controllers/ProgramController.js");
var _ItemController = require("./controllers/ItemController.js");
var _ArchiveController = require("./controllers/ArchiveController.js");
var _TaskController = require("./controllers/TaskController.js");
var _FinanceController = require("./controllers/FinanceController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const port = 8000;
_dotenv.default.config();
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _cookieParser.default)());
app.use(_express.default.json());
app.use((0, _expressFileupload.default)());
app.use(_express.default.static("public"));
app.use(_UserRoute.default);
app.use(_CategoryRoute.default);
app.use(_AccreditationRoute.default);
app.use(_AccreditationTypeRoute.default);
app.use(_AccreditationSubtypeRoute.default);
app.use(_StaffRoute.default);
app.use(_StaffTypeRoute.default);
app.use(_ProgramRoute.default);
app.use(_ProgramTypeRoute.default);
app.use(_ProgramSubtypeRoute.default);
app.use(_FinanceRoute.default);
app.use(_FinanceTypeRoute.default);
app.use(_TaskRoute.default);
app.use(_ArchiveRoute.default);
app.use(_ArchiveTypeRoute.default);
app.use(_ArchiveSubtypeRoute.default);
app.use(_ItemRoute.default);
app.use(_ItemTypeRoute.default);
app.use(_ItemSubtypeRoute.default);
app.use(_GetFileRoute.default);
app.use(_HistoryRoute.default);

// Jalankan cron job setiap jam 00.02.00
const autoDelete = _nodeCron.default.schedule("2 0 * * *", async () => {
  await (0, _ProgramController.autoDeleteProgram)();
  await (0, _ItemController.autoDeleteItem)();
  await (0, _ArchiveController.autoDeleteArchive)();
  await (0, _TaskController.autoDeleteTask)();
  await (0, _FinanceController.autoDeleteFinance)();
}, {
  scheduled: true,
  timezone: "Asia/Jakarta"
});
(async () => {
  await _database.default.authenticate();
  await _database.default.sync();
  await (0, _InsertCategory.default)();
  await (0, _InsertUser.default)();
  await (0, _InsertAccreditationType.default)();
  await (0, _InsertAccreditationSubtype.default)();
  await (0, _InsertStaffType.default)();
  await (0, _InsertProgramType.default)();
  await (0, _InsertProgramSubtype.default)();
  await (0, _InsertFinanceType.default)();
  await (0, _InsertArchiveType.default)();
  await (0, _InsertArchiveSubtype.default)();
  await (0, _InsertItemType.default)();
  await (0, _InsertItemSubtype.default)();
})();
autoDelete.start();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("Server is listening on port " + port + "...");
});