import express, { Response } from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import path from "path"

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

export default app