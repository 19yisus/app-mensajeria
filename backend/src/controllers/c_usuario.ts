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
        usuario.clave=Cifrado.cifrarClave(usuario.clave)
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
        let {id} = req.params
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setIdUsuario=id
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
        let {id} = req.params
        let modeloUsuario:ModeloUsuario = new ModeloUsuario(postgresql,cliente)
        modeloUsuario.setIdPersona=id
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

}

export default ControladorUsuario