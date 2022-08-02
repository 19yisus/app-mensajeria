import { Request, Response, Router } from "express"
import ControladorUsuario from "../../../controllers/c_usuario"
// controlador
import CotroladorUsuario from "../../../controllers/c_usuario"
// middleware
import crearConexionDBPG from "../../../middlewares/crear_conexion_db_pg"

let router=Router()

router.get("/",(req:Request,res:Response) => {
    res.status(200).send(req.baseUrl)
})

// TODO: actualizar clave
// TODO: actualizar preguntas
// TODO: actualizar respuesta de preguntas
// TODO: consultar preguntas
// TODO: validar respuestas de seguridad

router.post("/registrar",crearConexionDBPG,CotroladorUsuario.registrar)
router.get("/todo",crearConexionDBPG,CotroladorUsuario.consultarTodo)
router.get("/:idUsuario",crearConexionDBPG,ControladorUsuario.consultarUsuarioPorId)
router.get("/consultar/id-persona/:idPersona",crearConexionDBPG,ControladorUsuario.consultarUsuarioPorIdPersona)
router.patch("/activar-cuenta/:idUsuario",crearConexionDBPG,ControladorUsuario.activarCuenta)
router.patch("/desactivar-cuenta/:idUsuario",crearConexionDBPG,ControladorUsuario.desactivarCuenta)
router.patch("/actualizar/telefono/:idUsuario",crearConexionDBPG,ControladorUsuario.actualizarTelefono)
// router.patch("/actualizar/correo/:idUsuario",crearConexionDBPG,ControladorUsuario.actualizarCorreo)
// router.patch("/actualizar/clave/:id")
// router.patch("/actualizar/pregunta/:numero/:id")
// router.patch("/actualizar/respuesta/:numero/:id")
// router.get("/consultar-preguntas-seguridad/:id")
// router.get("/validar-respuestas-seguirdad/:id")



export default router
