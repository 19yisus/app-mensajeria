import app from "./app"
import { Server } from "socket.io";
import {CLIENTE, POSTGRESQL} from "./utils/postgresql";
import ControladorMensaje from "./controllers/c_mensaje";
import token_utilidad from "./utils/token";
const servidor = app.listen(app.get("PORT"),() => {
    console.log("corriendo api en el puerto : "+app.get("PORT"))
})

let io:Server= new Server(servidor,{
    cors: {
        origin: "http://127.0.0.1:5500"
    }
})
let usuarios=0
io.on("connection", sokect => {
    usuarios=usuarios+1
    console.log("conectando")
    sokect.on("consultar-mensajes-chat", async datosCliete => {
        let token=token_utilidad.validarToken(datosCliete.token)
        CLIENTE.then(async cliente => {
            let datos:any[] = await ControladorMensaje.consultarMensajesSokect(POSTGRESQL,cliente,token,datosCliete.id_cuarto)
            console.log(`enviado mensajes del chat ${datosCliete.id_cuarto} numeros total de mensajes ${datos.length}`)
            io.emit("obtener-mensajes-chat",datos)
        })
    })

    sokect.broadcast.emit("total-usuarios",usuarios)
    sokect.on("disconnect", () => {
        usuarios=usuarios-1
        console.log("desconectando del socket")
        sokect.broadcast.emit("total-usuarios",usuarios)
    })
})

export {
    io,
    app,
    servidor
}