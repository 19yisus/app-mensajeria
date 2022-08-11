import { Request, Response, Router } from "express";
// controlador
import ControladorSolicitud from "../../../controllers/c_solicitud";
// middleware
import crearConexionDBPG from "../../../middlewares/crear_conexion_db_pg"
import validarToken from "../../../middlewares/oauth"

let router=Router()

router.get("/",(req:Request,res:Response) => {
    res.send(req.baseUrl).status(200)
})

router.post("/enviar-solicitud",validarToken,crearConexionDBPG,ControladorSolicitud.enviarSolicitud)
router.get("/consultar/solicitudes",validarToken,crearConexionDBPG,ControladorSolicitud.consultarMisSolicitudesEspera)
router.get("/consultar/mis-solicitudes-enviadas",validarToken,crearConexionDBPG,ControladorSolicitud.consultarMisSolicitudesEnviadas)
router.patch("/aceptar/:id",validarToken,crearConexionDBPG,ControladorSolicitud.aceptarSolicitud)
router.patch("/rechazar/:id",validarToken,crearConexionDBPG,ControladorSolicitud.rechazarSolicitud)
router.delete("/borrar/:id",validarToken,crearConexionDBPG,ControladorSolicitud.borrarSolicitudEnviada)


export default router