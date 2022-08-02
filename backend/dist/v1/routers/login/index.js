"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const c_login_1 = __importDefault(require("../../../controllers/c_login"));
// middleware
const crear_conexion_db_pg_1 = __importDefault(require("../../../middlewares/crear_conexion_db_pg"));
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(req.baseUrl);
});
router.post("/iniciar-sesion", crear_conexion_db_pg_1.default, c_login_1.default.iniciarSesion);
// router.post("/verificar-sesion")
// router.post("/cerrar-sesion")
exports.default = router;
