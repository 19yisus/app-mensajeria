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

router.post("/registrar",crearConexionDBPG,CotroladorUsuario.registrar)
router.get("/yo",validarToken,crearConexionDBPG,ControladorUsuario.consultarme)
router.get("/todo",validarToken,crearConexionDBPG,CotroladorUsuario.consultarTodo)
router.get("/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.consultarUsuarioPorId)
router.get("/consultar/id-persona/:idPersona",validarToken,crearConexionDBPG,ControladorUsuario.consultarUsuarioPorIdPersona)
router.patch("/activar-cuenta/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.activarCuenta)
router.patch("/desactivar-cuenta/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.desactivarCuenta)
router.patch("/actualizar/telefono/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.actualizarTelefono)
router.patch("/actualizar/clave/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.actualizarClave)
router.patch("/actualizar/pregunta-respuesta/:numero/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.actualizarPreguntaDeSeguridad)
router.get("/consultar-preguntas-seguridad/:idUsuario",validarToken,crearConexionDBPG,ControladorUsuario.consultarPreguntasSeguridad)



export default router
