import express, { Response } from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import path from "path"
// import rutas
import RutasPersonaV1 from "./v1/routers/persona"
import RutasUsuarioV1 from "./v1/routers/usuario"
import RutasLoginV1 from "./v1/routers/login"
import RutasSolicitudV1 from "./v1/routers/solicitud"

let app = express()
let rutaPublic:string=path.resolve(__dirname,"../public")
dotenv.config({path:path.resolve(__dirname,"../.env")})
let {PORT} = process.env
// set
app.set("PORT",PORT || 5500)
// get
app.get("/help",(res:Response) =>{
    res.send("servidor corriendo con exito")
})
// middlewar
app.use(cors())
.use(express.json())
.use(express.static(rutaPublic))
.use(morgan("dev"))

// rooters
// v1
app.use("/api/v1/persona",RutasPersonaV1)
.use("/api/v1/usuario",RutasUsuarioV1)
.use("/api/v1/login",RutasLoginV1)
.use("/api/v1/solicitud/",RutasSolicitudV1)

export default app