import { Request, Response } from "express";
import moment from "moment";
import { QueryResult } from "pg";
import respuestaServidor from "../interfaces/types/respuesta_servidor";
import ModeloContacto from "../models/m_contacto";
import ModeloCuarto from "../models/m_cuarto";
import ModeloMensaje from "../models/m_mensaje";

let ControladorMensaje ={


    crearMensaje: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente, token , id_cuarto, mensaje} = req.body
        let { idCuarto } = req.params
        let modeloMensaje:ModeloMensaje= new ModeloMensaje(postgresql,cliente)
        if(idCuarto==id_cuarto){
            modeloMensaje.setIdCuarto=id_cuarto
            modeloMensaje.setIdUsuario=token.id_usuario
            modeloMensaje.setMensaje=mensaje
            modeloMensaje.setFecha=moment().format("YYYY-MM-DD")
            modeloMensaje.setHora=moment().format("H:mm:ss")
            let resultMensaje:QueryResult= await modeloMensaje.crearMensaje()
            if(resultMensaje.rowCount>0){
                respuesta={
                    codigo_respuesta:200,
                    tipo_mensaje:"success",
                    mensaje_respuesta:"mensaje enviado",
                }
                res.status(200).json(respuesta)
            }
            else{
                respuesta={
                    codigo_respuesta:400,
                    tipo_mensaje:"danger",
                    mensaje_respuesta:"error al crear el mensaje",
                }
                res.status(400).json(respuesta)
            }

        }
        else{
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"danger",
                mensaje_respuesta:"intento enviar un mensaje a un chat incorrepto",
            }
            res.status(400).json(respuesta)
        }


    },

    consultarMensajes: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente, token} = req.body
        let { idCuarto } = req.params
        let modeloContacto:ModeloContacto= new ModeloContacto(postgresql, cliente)
        let modeloMensaje:ModeloMensaje=new ModeloMensaje(postgresql, cliente)
        modeloContacto.setIdUsuario=token.id_usuario
        modeloContacto.setIdCuarto=idCuarto
        let resultContacto:QueryResult=await modeloContacto.consultarPorIdUsuarioYIdCuarto()
        if(resultContacto.rowCount>0){
            modeloMensaje.setIdCuarto=idCuarto
            let resultMensaje:QueryResult=await modeloMensaje.consultarMensajesDelChat()
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"consulta completada",
                datos_respuesta:{
                    mensajes:resultMensaje.rows,
                    totalMensajes:resultMensaje.rowCount
                }
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"danger",
                mensaje_respuesta:"no se ha encontrado el chat",
            }
            res.status(400).json(respuesta)
        }
    },

    paginarMensajes: async (req:Request,res:Response) => {},

    editarMensaje: async (req:Request,res:Response) => {},

    borrarMensaje: async (req:Request,res:Response) => {}



}

export default ControladorMensaje