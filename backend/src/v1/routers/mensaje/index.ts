import { Request, Response, Router } from "express";
import ControladorMensaje from "../../../controllers/c_mensaje";
import crearConexionDBPG from "../../../middlewares/crear_conexion_db_pg"
import validarToken from "../../../middlewares/oauth"

let router=Router()

router.get("/",(req:Request,res:Response) => {
    res.status(200).send(req.baseUrl)
})

router.post("/enviar/:idCuarto",validarToken,crearConexionDBPG,ControladorMensaje.crearMensaje)
router.get("/consultar/:idCuarto",validarToken,crearConexionDBPG,ControladorMensaje.consultarMensajes)

export default router