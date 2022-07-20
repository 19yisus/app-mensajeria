"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
let app = (0, express_1.default)();
let rutaPublic = path_1.default.resolve(__dirname, "../public");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
let { PORT } = process.env;
// set
app.set("PORT", PORT || 5500);
// get
app.get("/help", (res) => {
    res.send("servidor corriendo con exito");
});
// middlewar
app.use((0, cors_1.default)())
    .use(express_1.default.json())
    .use(express_1.default.static(rutaPublic))
    .use((0, morgan_1.default)("dev"));
// rooters
exports.default = app;
