"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const c_mensaje_1 = __importDefault(require("../../../controllers/c_mensaje"));
const crear_conexion_db_pg_1 = __importDefault(require("../../../middlewares/crear_conexion_db_pg"));
const oauth_1 = __importDefault(require("../../../middlewares/oauth"));
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(req.baseUrl);
});
router.post("/enviar/:idCuarto", oauth_1.default, crear_conexion_db_pg_1.default, c_mensaje_1.default.crearMensaje);
router.get("/consultar/:idCuarto", oauth_1.default, crear_conexion_db_pg_1.default, c_mensaje_1.default.consultarMensajes);
exports.default = router;
