"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controlador
const c_solicitud_1 = __importDefault(require("../../../controllers/c_solicitud"));
// middleware
const crear_conexion_db_pg_1 = __importDefault(require("../../../middlewares/crear_conexion_db_pg"));
const oauth_1 = __importDefault(require("../../../middlewares/oauth"));
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send(req.baseUrl).status(200);
});
router.post("/enviar-solicitud", oauth_1.default, crear_conexion_db_pg_1.default, c_solicitud_1.default.enviarSolicitud);
router.get("/consultar/mi-solicitudes", oauth_1.default, crear_conexion_db_pg_1.default, c_solicitud_1.default.consultarMisSolicitudesEspera);
router.get("/consultar/solicitudes-enviadas", oauth_1.default, crear_conexion_db_pg_1.default, c_solicitud_1.default.consultarMisSolicitudesEnviadas);
router.patch("/aceptar-solicitud/:id", oauth_1.default, crear_conexion_db_pg_1.default, c_solicitud_1.default.aceptarSolicitud);
router.patch("/rechazar-solicitud/:id", oauth_1.default, crear_conexion_db_pg_1.default, c_solicitud_1.default.rechazarSolicitud);
router.delete("/borrar-solicitud/:id", oauth_1.default, crear_conexion_db_pg_1.default, c_solicitud_1.default.borrarSolicitudEnviada);
exports.default = router;
