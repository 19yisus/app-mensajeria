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
// import rutas
const persona_1 = __importDefault(require("./v1/routers/persona"));
const usuario_1 = __importDefault(require("./v1/routers/usuario"));
const login_1 = __importDefault(require("./v1/routers/login"));
const solicitud_1 = __importDefault(require("./v1/routers/solicitud"));
const contacto_1 = __importDefault(require("./v1/routers/contacto"));
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
// v1
app.use("/api/v1/persona", persona_1.default)
    .use("/api/v1/usuario", usuario_1.default)
    .use("/api/v1/login", login_1.default)
    .use("/api/v1/solicitud/", solicitud_1.default)
    .use("/api/v1/contacto/", contacto_1.default);
exports.default = app;
