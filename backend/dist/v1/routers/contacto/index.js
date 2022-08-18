"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const c_contacto_1 = __importDefault(require("../../../controllers/c_contacto"));
const crear_conexion_db_pg_1 = __importDefault(require("../../../middlewares/crear_conexion_db_pg"));
const oauth_1 = __importDefault(require("../../../middlewares/oauth"));
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(req.baseUrl);
});
router.get("/mis-contactos", oauth_1.default, crear_conexion_db_pg_1.default, c_contacto_1.default.consultarContactos);
exports.default = router;
