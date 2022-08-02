"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controlador
const c_persona_1 = __importDefault(require("../../../controllers/c_persona"));
// middleware
const crear_conexion_db_pg_1 = __importDefault(require("../../../middlewares/crear_conexion_db_pg"));
const oauth_1 = __importDefault(require("../../../middlewares/oauth"));
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send(req.baseUrl).status(200);
});
router.post("/registrar", crear_conexion_db_pg_1.default, c_persona_1.default.registrar);
router.get("/todo", oauth_1.default, crear_conexion_db_pg_1.default, c_persona_1.default.consultarTodo);
router.get("/:id", oauth_1.default, crear_conexion_db_pg_1.default, c_persona_1.default.consultarPorId);
router.put("/actualizar/:id", oauth_1.default, crear_conexion_db_pg_1.default, c_persona_1.default.actualizar);
router.get("/consultar/:nickname", oauth_1.default, crear_conexion_db_pg_1.default, c_persona_1.default.consultarPorNickName);
router.get("/buscar/:nickname", oauth_1.default, crear_conexion_db_pg_1.default, c_persona_1.default.buscarPorNickName);
exports.default = router;
