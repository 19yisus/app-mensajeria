import { Request, Response } from "express"
import respuestaServidor from "../interfaces/types/respuesta_servidor"
// modelos
import ModeloSolicitud from "../models/m_solicitud"
import ModeloCuarto from "../models/m_cuarto"
// utilidades
import { Query, QueryResult } from "pg"
import ModeloContacto from "../models/m_contacto"


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
        modeloSolicitud.setIdSolicita=token.id_usuario
        let resultSolicitud:QueryResult= await modeloSolicitud.consultarMisSolicitudesEspera()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount>0){
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
        let { id } = req.params
        let modeloSolicitud:ModeloSolicitud=new ModeloSolicitud(postgresql,cliente)
        modeloSolicitud.setIdSolicita=token.id_usuario
        modeloSolicitud.setIdSolicitud=id
        let resultSolicitud:QueryResult= await modeloSolicitud.aceptarSolicitud()

        if(resultSolicitud.rowCount===1){
            let resultSolicitud2:QueryResult= await modeloSolicitud.consultarSolicitud()
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"solicitud aceptada"
            }
            let cuarto:ModeloCuarto=new ModeloCuarto(postgresql,cliente)
            let resultCUarto:QueryResult=await cuarto.crearCuarto()
            console.log(`id del cuarto ${resultCUarto.rows[0].id_cuarto}`)
            console.log(`datos de la solicitud para crear los contactos `,resultSolicitud2.rows[0])
            let datosCuarto:any=resultCUarto.rows[0]
            let datosSolicitud:any=resultSolicitud2.rows[0]
            let contactoUsuario1:ModeloContacto= new ModeloContacto(postgresql,cliente)
            let contactoUsuario2:ModeloContacto= new ModeloContacto(postgresql,cliente)
            contactoUsuario1.setDatos={
                id_contacto:"",
                id_usuario:datosSolicitud.id_usuario_solicito as string,
                id_cuarto:datosCuarto.id_cuarto as string,
                contacto_id_usuario:datosSolicitud.id_solicita as string,
                estado_contacto:"",
            }
            contactoUsuario2.setDatos={
                id_contacto:"",
                id_usuario:datosSolicitud.id_solicita as string,
                id_cuarto:datosCuarto.id_cuarto as string,
                contacto_id_usuario:datosSolicitud.id_usuario_solicito as string,
                estado_contacto:"",
            }
            
            let resultContactoUsuario1:QueryResult=await contactoUsuario1.crearContacto()
            let resultContactoUsuario2:QueryResult=await contactoUsuario2.crearContacto()
            await postgresql.cerrarConexion(cliente)
            if(resultContactoUsuario1.rowCount>0 && resultContactoUsuario2.rowCount>0){
                respuesta={
                    codigo_respuesta:200,
                    tipo_mensaje:"success",
                    mensaje_respuesta:"solicitud aceptada",
                }
                res.status(200).json(respuesta)
            }
            else{
                respuesta={
                    codigo_respuesta:400,
                    tipo_mensaje:"danger",
                    mensaje_respuesta:"error por algun motivo a fallado el proceso de aceptar la solicitud por favor comunique a soporte de este problema",
                }
                res.status(400).json(respuesta)
            }
            // res.status(200).json(respuesta)
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
        let { id } = req.params
        let modeloSolicitud:ModeloSolicitud=new ModeloSolicitud(postgresql,cliente)
        modeloSolicitud.setIdSolicita=token.id_usuario
        modeloSolicitud.setIdSolicitud=id
        let resultSolicitud:QueryResult= await modeloSolicitud.rechazarSolicitud()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount===2){
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
        let resultSolicitud:QueryResult= await modeloSolicitud.consultarMisSolicitudes()
        await postgresql.cerrarConexion(cliente)
        if(resultSolicitud.rowCount>0){
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
        let { id } = req.params
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