import { Request, Response, Router } from "express";
import ControladorPersona from "../../../controllers/c_persona";

let router=Router()

router.get("/",(req:Request,res:Response) => {
    res.send(req.baseUrl)
})

export default router