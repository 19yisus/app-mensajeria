import { Request, Response, Router } from "express";
// controlador
import ControladorPersona from "../../../controllers/c_persona";
// middleware
import crearConexionDBPG from "../../../middlewares/crear_conexion_db_pg"

let router=Router()

router.get("/",(req:Request,res:Response) => {
    res.send(req.baseUrl).status(200)
})

router.post("/registrar",crearConexionDBPG,ControladorPersona.registrar)

router.get("/todo",crearConexionDBPG,ControladorPersona.consultarTodo)

router.get("/:id",crearConexionDBPG,ControladorPersona.consultarPorId)

router.put("/actualizar/:id",crearConexionDBPG,ControladorPersona.actualizar)

router.get("/consultar/:nickname",crearConexionDBPG,ControladorPersona.consultarPorNickName)

router.get("/buscar/:nickname",crearConexionDBPG,ControladorPersona.buscarPorNickName)



export default router