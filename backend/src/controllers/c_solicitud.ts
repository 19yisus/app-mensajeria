import { Request, Response } from "express"
import respuestaServidor from "../interfaces/types/respuesta_servidor"
// modelos
import ModeloSolicitud from "../models/m_solicitud"
// utilidades
import { QueryResult } from "pg"


const ControladorSolicitud = {

    enviarSolicitud: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente, token } = req.body
        let { id_solicita } = req.body

        let modeloSolicitud:ModeloSolicitud=new ModeloSolicitud(postgresql,cliente)
        modeloSolicitud.setIdSolicita=id_solicita
        modeloSolicitud.setIdUsuario=token.id_usuario
        let resultSolicitud:QueryResult=await modeloSolicitud.registrar()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount===1){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"solicitud enviada con exito",
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al registrar",
            }
            res.status(400).json(respuesta)
        }

    },

    consultarMisSolicitudesEspera: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente, token } = req.body
        let modeloSolicitud:ModeloSolicitud=new ModeloSolicitud(postgresql,cliente)
        console.log(token.id_usuario)
        modeloSolicitud.setIdSolicita=token.id_usuario
        let resultSolicitud:QueryResult= await modeloSolicitud.consultarMisSolicitudesEspera()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount===1){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"consulta completada",
                datos_respuesta:resultSolicitud.rows
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"no tines solicitudes",
            }
            res.status(404).json(respuesta)
        }
    },

    aceptarSolicitud: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente, token } = req.body
        let { id } = req.body
        let modeloSolicitud:ModeloSolicitud=new ModeloSolicitud(postgresql,cliente)
        modeloSolicitud.setIdUsuario=token.id_usuario
        modeloSolicitud.setIdSolicitud=id
        let resultSolicitud:QueryResult= await modeloSolicitud.aceptarSolicitud()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount===1){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"solicitud aceptada"
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al aceptar la solicitud",
            }
            res.status(400).json(respuesta)
        }
    },

    rechazarSolicitud: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente, token } = req.body
        let { id } = req.body
        let modeloSolicitud:ModeloSolicitud=new ModeloSolicitud(postgresql,cliente)
        modeloSolicitud.setIdUsuario=token.id_usuario
        modeloSolicitud.setIdSolicitud=id
        let resultSolicitud:QueryResult= await modeloSolicitud.rechazarSolicitud()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount===1){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"solicitud rechazada"
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al rechazar la solicitud",
            }
            res.status(400).json(respuesta)
        }
    },

    consultarMisSolicitudesEnviadas: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente, token } = req.body
        let modeloSolicitud:ModeloSolicitud=new ModeloSolicitud(postgresql,cliente)
        modeloSolicitud.setIdUsuario=token.id_usuario
        let resultSolicitud:QueryResult= await modeloSolicitud.consultarMisSolicitudesEspera()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount===1){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"consulta completada",
                datos_respuesta:resultSolicitud.rows
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"no solicitudes",
            }
            res.status(404).json(respuesta)
        }
    },


    borrarSolicitudEnviada: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente, token } = req.body
        let { id } = req.body
        let modeloSolicitud:ModeloSolicitud=new ModeloSolicitud(postgresql,cliente)
        modeloSolicitud.setIdUsuario=token.id_usuario
        modeloSolicitud.setIdSolicitud=id
        let resultSolicitud:QueryResult= await modeloSolicitud.borrarSolicitudEnviada()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount===1){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"solicitud borrada con exito"
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"danger",
                mensaje_respuesta:"no se pudo borrar la solicitud hay posibilidad que la solicitud que intinto borrar no se suya",
            }
            res.status(400).json(respuesta)
        }
    }



}

export default ControladorSolicitud