"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(req.baseUrl);
});
// TODO: registra usuario con clave encriptada
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
// router.post("/registrar")
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
exports.default = router;
