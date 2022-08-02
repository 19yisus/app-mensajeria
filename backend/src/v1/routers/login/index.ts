import { Request, Response, Router } from "express";
import ControladorLogin from "../../../controllers/c_login";
// middleware
import crearConexionDBPG from "../../../middlewares/crear_conexion_db_pg"

let router:Router=Router()

router.get("/",(req:Request,res:Response) => {
    res.status(200).send(req.baseUrl)
})

router.post("/iniciar-sesion",crearConexionDBPG,ControladorLogin.iniciarSesion)
// router.post("/verificar-sesion")
// router.post("/cerrar-sesion")

export default router
