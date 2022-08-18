import { Request, Response, Router } from "express";
import ControladorContacto from "../../../controllers/c_contacto";
import crearConexionDBPG from "../../../middlewares/crear_conexion_db_pg"
import validarToken from "../../../middlewares/oauth"

let router=Router()

router.get("/",(req:Request,res:Response) => {
    res.status(200).send(req.baseUrl)
})

router.get("/mis-contactos",validarToken,crearConexionDBPG,ControladorContacto.consultarContactos)

export default router