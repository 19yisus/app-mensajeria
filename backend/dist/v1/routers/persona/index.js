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
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send(req.baseUrl).status(200);
});
router.post("/registrar", crear_conexion_db_pg_1.default, c_persona_1.default.registrar);
// router.get("/:id")
// router.get("/nick-name/:nick")
// router.get("/todo")
// router.put("/:id")
exports.default = router;
