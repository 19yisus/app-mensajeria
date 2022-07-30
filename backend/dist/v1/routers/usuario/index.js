"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controlador
const c_usuario_1 = __importDefault(require("../../../controllers/c_usuario"));
// middleware
const crear_conexion_db_pg_1 = __importDefault(require("../../../middlewares/crear_conexion_db_pg"));
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(req.baseUrl);
});
// TODO: consultar al usuario por su id de usuario
// TODO: consultar al usuario por su id de persona
// TODO: consultar todos 
// TODO: activar cuenta
// TODO: desactivar cuenta
// TODO: actualizar telefono
// TODO: actualizar correo
// TODO: actualizar clave
// TODO: actualizar preguntas
// TODO: actualizar respuesta de preguntas
// TODO: consultar preguntas
// TODO: validar respuestas de seguridad
router.post("/registrar", crear_conexion_db_pg_1.default, c_usuario_1.default.registrar);
// router.get("/:id")
// router.get("/todos")
// router.get("/consultar/id-persona/:id")
// router.put("/activar-cuenta/:id")
// router.put("desactivar-cuenta/:id")
// router.put("/actualizar/telefono/:id")
// router.put("/actualizar/correo/:id")
// router.put("/actualizar/clave/:id")
// router.put("/actualizar/pregunta/:numero/:id")
// router.put("/actualizar/respuesta/:numero/:id")
// router.get("/consultar-preguntas-seguridad/:id")
// router.get("/validar-respuestas-seguirdad/:id")
exports.default = router;
