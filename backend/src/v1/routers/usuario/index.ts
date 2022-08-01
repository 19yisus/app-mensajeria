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
// TODO: activar cuenta
// TODO: desactivar cuenta
// TODO: actualizar telefono
// TODO: actualizar correo
// TODO: actualizar clave
// TODO: actualizar preguntas
// TODO: actualizar respuesta de preguntas
// TODO: consultar preguntas
// TODO: validar respuestas de seguridad

router.post("/registrar",crearConexionDBPG,CotroladorUsuario.registrar)
router.get("/todo",crearConexionDBPG,CotroladorUsuario.consultarTodo)
router.get("/:id",crearConexionDBPG,ControladorUsuario.consultarUsuarioPorId)
router.get("/consultar/id-persona/:id",crearConexionDBPG,ControladorUsuario.consultarUsuarioPorIdPersona)
// router.put("/activar-cuenta/:id")
// router.put("desactivar-cuenta/:id")
// router.put("/actualizar/telefono/:id")
// router.put("/actualizar/correo/:id")
// router.put("/actualizar/clave/:id")
// router.put("/actualizar/pregunta/:numero/:id")
// router.put("/actualizar/respuesta/:numero/:id")
// router.get("/consultar-preguntas-seguridad/:id")
// router.get("/validar-respuestas-seguirdad/:id")



export default router
