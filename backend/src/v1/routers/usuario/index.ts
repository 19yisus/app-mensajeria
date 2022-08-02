import { Request, Response, Router } from "express"
import ControladorUsuario from "../../../controllers/c_usuario"
// controlador
import CotroladorUsuario from "../../../controllers/c_usuario"
// middleware
import crearConexionDBPG from "../../../middlewares/crear_conexion_db_pg"
import validarToken from "../../../middlewares/oauth"

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
router.get("/todo",validarToken,crearConexionDBPG,CotroladorUsuario.consultarTodo)
router.get("/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.consultarUsuarioPorId)
router.get("/consultar/id-persona/:idPersona",validarToken,crearConexionDBPG,ControladorUsuario.consultarUsuarioPorIdPersona)
router.patch("/activar-cuenta/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.activarCuenta)
router.patch("/desactivar-cuenta/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.desactivarCuenta)
router.patch("/actualizar/telefono/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.actualizarTelefono)
// router.patch("/actualizar/clave/:id",validarToken)
// router.patch("/actualizar/pregunta/:numero/:id",validarToken)
// router.patch("/actualizar/respuesta/:numero/:id",validarToken)
// router.get("/consultar-preguntas-seguridad/:id",validarToken)
// router.get("/validar-respuestas-seguirdad/:id",validarToken)



export default router
