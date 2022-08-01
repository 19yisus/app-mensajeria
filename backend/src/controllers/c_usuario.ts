import { Request, Response } from "express"
import respuestaServidor from "../interfaces/types/respuesta_servidor"
// modelos
import ModeloUsuario from "../models/m_usuario"
import ModeloPersona from "../models/m_persona"
// utilidades
import Cifrado from "../utils/cifrado"
import { QueryResult } from "pg"


const ControladorUsuario = {

    registrar: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let { 
            id_persona,
            correo,
            telefono,
            clave,
            pregunta_1,
            pregunta_2,
            respuesta_1,
            respuesta_2
        } = req.body
        let usuario= {
            id_usuario:"",
            id_persona,
            correo,
            telefono,
            clave,
            pregunta_1,
            pregunta_2,
            respuesta_1,
            respuesta_2,
            estado_usuario:""
        }
        usuario.clave=await Cifrado.cifrarClave(usuario.clave)
        let modeloUsuario:ModeloUsuario=new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setDatos=usuario
        let resultUsuario:QueryResult=await modeloUsuario.registrar()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"registro completado",
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

    consultarUsuarioPorId: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let {idUsuario} = req.params
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setIdUsuario=idUsuario
        let resultUsuario:QueryResult=await modeloUsuario.consultarIdUsuario()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"consulta completada",
                datos_respuesta:resultUsuario.rows[0]
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al consultar no se a encontrado el recurso",
            }
            res.status(404).json(respuesta)
        }
    },

    consultarTodo: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let {id} = req.params
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        let resultUsuario:QueryResult=await modeloUsuario.consultarTodo()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"consulta completada",
                datos_respuesta:resultUsuario.rows
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al consultar no se a encontrado el recurso",
            }
            res.status(404).json(respuesta)
        }
    },

    consultarUsuarioPorIdPersona: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let {idPersona} = req.params
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setIdPersona=idPersona
        let resultUsuario:QueryResult=await modeloUsuario.consultarIdPersona()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"consulta completada",
                datos_respuesta:resultUsuario.rows[0]
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al consultar no se a encontrado el recurso",
            }
            res.status(404).json(respuesta)
        }
    },

    activarCuenta: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let {idUsuario} = req.params
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setIdUsuario=idUsuario
        let resultUsuario:QueryResult=await modeloUsuario.activarUsuario()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"cuenta activa con exito",
                datos_respuesta:resultUsuario.rows[0]
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al activar la cuenta no se a podido encontra el usuario",
            }
            res.status(404).json(respuesta)
        }
    },

    desactivarCuenta: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let {idUsuario} = req.params
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setIdUsuario=idUsuario
        let resultUsuario:QueryResult=await modeloUsuario.desactivarUsuario()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"cuenta desactivada con exito",
                datos_respuesta:resultUsuario.rows[0]
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al desactivar la cuenta no se a podido encontra el usuario",
            }
            res.status(404).json(respuesta)
        }
    },


    actualizarTelefono: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let {idUsuario} = req.params
        let { telefono } = req.body
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setIdUsuario=idUsuario
        modeloUsuario.setTelefono=telefono
        let resultUsuario:QueryResult=await modeloUsuario.actualizarTelefono()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"telefono actualizado",
                datos_respuesta:resultUsuario.rows[0]
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al actualizar el telefono",
            }
            res.status(404).json(respuesta)
        }
    },

    actualizarCorreo: async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let {idUsuario} = req.params
        let { correo } = req.body
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setIdUsuario=idUsuario
        modeloUsuario.setCorreo=correo
        let resultUsuario:QueryResult=await modeloUsuario.actualizarCorreo()
        await postgresql.cerrarConexion(cliente)
        if(resultUsuario.rowCount>0){
            respuesta={
                codigo_respuesta:200,
                tipo_mensaje:"success",
                mensaje_respuesta:"correo actualizado"
            }
            res.status(200).json(respuesta)
        }
        else{
            respuesta={
                codigo_respuesta:404,
                tipo_mensaje:"danger",
                mensaje_respuesta:"error al actualizar el correo",
            }
            res.status(404).json(respuesta)
        }
    },

}

export default ControladorUsuario