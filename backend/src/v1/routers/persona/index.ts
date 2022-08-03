import { Request, Response, Router } from "express";
// controlador
import ControladorPersona from "../../../controllers/c_persona";
// middleware
import crearConexionDBPG from "../../../middlewares/crear_conexion_db_pg"
import validarToken from "../../../middlewares/oauth"

let router=Router()

router.get("/",(req:Request,res:Response) => {
    res.send(req.baseUrl).status(200)
})

router.post("/registrar",crearConexionDBPG,ControladorPersona.registrar)

router.get("/yo",validarToken,crearConexionDBPG,ControladorPersona.consultarTodo)

router.get("/todo",validarToken,crearConexionDBPG,ControladorPersona.consultarTodo)

router.get("/:id",validarToken,crearConexionDBPG,ControladorPersona.consultarPorId)

router.put("/actualizar/:id",validarToken,crearConexionDBPG,ControladorPersona.actualizar)

router.get("/consultar/:nickname",validarToken,crearConexionDBPG,ControladorPersona.consultarPorNickName)

router.get("/buscar/:nickname",validarToken,crearConexionDBPG,ControladorPersona.buscarPorNickName)



export default router