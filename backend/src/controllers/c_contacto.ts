import { Request, Response } from "express";
import { QueryResult } from "pg";
import respuestaServidor from "../interfaces/types/respuesta_servidor";
import ModeloContacto from "../models/m_contacto";

let ControladorContacto = {

    consultarContactos: async (req:Request,res:Response) =>{
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
            datos_respuesta:[]
        }
        let { postgresql, cliente, token } = req.body
        let modeloContacto:ModeloContacto=new ModeloContacto(postgresql,cliente)
        modeloContacto.setIdUsuario=token.id_usuario
        let resultContacto:QueryResult=await modeloContacto.consultarContactos()
        await postgresql.cerrarConexion(cliente)
        if(resultContacto.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"consulta completada",
                datos_respuesta:resultContacto.rows
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"no tienes contactos",
                datos_respuesta:[]
            }
            res.status(404).json(respuesta)
        }
    },

    // eliminarContacto: async (req:Request,res:Response) =>{},


}

export default ControladorContacto