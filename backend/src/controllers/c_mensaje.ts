import { Request, Response } from "express";
import moment from "moment";
import { QueryResult } from "pg";
import respuestaServidor from "../interfaces/types/respuesta_servidor";
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

    consultarMensajes: async (areq:Request,res:Response) => {},

    paginarMensajes: async (areq:Request,res:Response) => {},

    editarMensaje: async (areq:Request,res:Response) => {},

    borrarMensaje: async (areq:Request,res:Response) => {}



}

export default ControladorMensaje