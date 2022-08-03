"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const c_usuario_1 = __importDefault(require("../../../controllers/c_usuario"));
// controlador
const c_usuario_2 = __importDefault(require("../../../controllers/c_usuario"));
// middleware
const crear_conexion_db_pg_1 = __importDefault(require("../../../middlewares/crear_conexion_db_pg"));
const oauth_1 = __importDefault(require("../../../middlewares/oauth"));
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(req.baseUrl);
});
// TODO: actualizar clave
// TODO: actualizar preguntas
// TODO: actualizar respuesta de preguntas
// TODO: consultar preguntas
// TODO: validar respuestas de seguridad
router.post("/registrar", crear_conexion_db_pg_1.default, c_usuario_2.default.registrar);
router.get("/todo", oauth_1.default, crear_conexion_db_pg_1.default, c_usuario_2.default.consultarTodo);
router.get("/:idUsuario", oauth_1.default, crear_conexion_db_pg_1.default, c_usuario_1.default.consultarUsuarioPorId);
router.get("/consultar/id-persona/:idPersona", oauth_1.default, crear_conexion_db_pg_1.default, c_usuario_1.default.consultarUsuarioPorIdPersona);
router.patch("/activar-cuenta/:idUsuario", oauth_1.default, crear_conexion_db_pg_1.default, c_usuario_1.default.activarCuenta);
router.patch("/desactivar-cuenta/:idUsuario", oauth_1.default, crear_conexion_db_pg_1.default, c_usuario_1.default.desactivarCuenta);
router.patch("/actualizar/telefono/:idUsuario", oauth_1.default, crear_conexion_db_pg_1.default, c_usuario_1.default.actualizarTelefono);
// router.patch("/actualizar/clave/:id",validarToken,crearConexionDBPG)
router.patch("/actualizar/pregunta-respuesta/:numero/:idUsuario", oauth_1.default, crear_conexion_db_pg_1.default, c_usuario_1.default.actualizarPreguntaDeSeguridad);
router.get("/consultar-preguntas-seguridad/:idUsuario", oauth_1.default, crear_conexion_db_pg_1.default, c_usuario_1.default.consultarPreguntasSeguridad);
exports.default = router;
