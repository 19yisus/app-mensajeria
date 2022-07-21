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

// router.get("/:id")

// router.get("/nick-name/:nick")

// router.get("/todo")

// router.put("/:id")

export default router