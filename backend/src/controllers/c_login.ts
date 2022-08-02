import { Request, Response } from "express"
import { QueryResult } from "pg"
import respuestaServidor from "../interfaces/types/respuesta_servidor"
import cifrado from "../utils/cifrado"
import JWToken from "../utils/token"
// modelos
import ModeloUsuario from "../models/m_usuario"

const ControladorLogin = {

    iniciarSesion:async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let {correo, clave} = req.body
        let modeloUsuario:ModeloUsuario=new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setCorreo=correo
        let resultUsuario=await modeloUsuario.consultarPorCorreo()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            let datosUsuario=resultUsuario.rows[0]
            if(await cifrado.compararClave(clave,datosUsuario.clave)){
                let payload={
                    id_usuario:datosUsuario.id_usuario,
                    nombre:datosUsuario.nombre,
                    apellido:datosUsuario.apellido,
                    nickname:datosUsuario.nick_name,
                    correo:datosUsuario.correo
                }
                let token = JWToken.crearToken(payload)
                respuesta={
                    codigo_respuesta:200,
                    tipo_mensaje:"success",
                    mensaje_respuesta:"token creado",
                    token
                }
                res.status(200).json(respuesta)
            }
            else{
                console.log("la clave no coincide")
                respuesta={
                    codigo_respuesta:400,
                    tipo_mensaje:"danger",
                    mensaje_respuesta:"a clave no coincide",
                }
                res.status(400).json(respuesta)
            }
        }
        else{
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"danger",
                mensaje_respuesta:"usuario no encontrado",
            }
            res.status(400).json(respuesta)
            // usuario no encontrado
        }
    }

}

export default ControladorLogin