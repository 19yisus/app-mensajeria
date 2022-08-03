import { Request, Response } from "express"
import { QueryResult } from "pg"
import respuestaServidor from "../interfaces/types/respuesta_servidor"
import ModeloPersona from "../models/m_persona"

let ControladorPersona = {

    registrar:async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let { postgresql, cliente } = req.body
        let { nick_name, nombre, apellido } = req.body
        let persona={
            id_persona:"",
            nick_name,
            nombre, 
            apellido
        }
        let persona_modelo:ModeloPersona=new ModeloPersona(postgresql,cliente)
        persona_modelo.setDatos=persona
        let result:QueryResult=await persona_modelo.consultarPorNickName()
        if(result.rowCount>0){
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"warning",
                mensaje_respuesta:"el registro no pudo ser procesado por que el nick '"+persona.nick_name+"' ya esta en uso",
            }
            await postgresql.cerrarConexion(cliente)
            res.status(400).json(respuesta)
        }
        if(result.rowCount===0){
            result=await persona_modelo.registrar()
            if(result.rowCount>0){
                respuesta={
                    codigo_respuesta:200,
                    tipo_mensaje:"success",
                    mensaje_respuesta:"registro completado",
                }
                await postgresql.cerrarConexion(cliente)
                res.status(200).json(respuesta)
            }
        }
    },

    consultarPorId:async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
            datos_respuesta:[]
        }
        let { postgresql, cliente ,token} = req.body
        let { id } = req.params
        let persona:ModeloPersona= new ModeloPersona(postgresql,cliente)
        persona.setIdPersona=id
        let resultPersona=await persona.consultarPorId()
        postgresql.cerrarConexion(cliente)
        if(resultPersona.rowCount>0){
            respuesta.codigo_respuesta=200
            respuesta.tipo_mensaje="success"
            respuesta.mensaje_respuesta="consulta completada"
            respuesta.datos_respuesta=resultPersona.rows
            res.status(200).json(respuesta)
        }
        else{
            respuesta.codigo_respuesta=404
            respuesta.tipo_mensaje="danger"
            respuesta.mensaje_respuesta="el recurso no a sido encontrado"
            res.status(404).json(respuesta)
        }
    },

    buscarPorNickName:async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
            datos_respuesta:[]
        }
        let { postgresql, cliente } = req.body
        let { nickname } = req.params
        let persona:ModeloPersona= new ModeloPersona(postgresql,cliente)
        persona.setNickName=nickname
        let resultPersona=await persona.buscarPorNickName()
        postgresql.cerrarConexion(cliente)
        if(resultPersona.rowCount>0){
            respuesta.codigo_respuesta=200
            respuesta.tipo_mensaje="success"
            respuesta.mensaje_respuesta="consulta completada"
            respuesta.datos_respuesta=resultPersona.rows
            res.status(200).json(respuesta)
        }
        else{
            respuesta.codigo_respuesta=404
            respuesta.tipo_mensaje="danger"
            respuesta.mensaje_respuesta="el recurso no a sido encontrado"
            res.status(404).json(respuesta)
        }
    },

    consultarPorNickName:async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
            datos_respuesta:[]
        }
        let { postgresql, cliente } = req.body
        let { nickname } = req.params
        let persona:ModeloPersona= new ModeloPersona(postgresql,cliente)
        persona.setNickName=nickname
        let resultPersona=await persona.consultarPorNickName()
        postgresql.cerrarConexion(cliente)
        if(resultPersona.rowCount>0){
            respuesta.codigo_respuesta=200
            respuesta.tipo_mensaje="success"
            respuesta.mensaje_respuesta="consulta completada"
            respuesta.datos_respuesta=resultPersona.rows
            res.status(200).json(respuesta)
        }
        else{
            respuesta.codigo_respuesta=404
            respuesta.tipo_mensaje="danger"
            respuesta.mensaje_respuesta="el recurso no a sido encontrado"
            res.status(404).json(respuesta)
        }
    },

    consultarTodo:async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
            datos_respuesta:[]
        }
        let { postgresql, cliente, token } = req.body
        let persona:ModeloPersona= new ModeloPersona(postgresql,cliente)
        persona.setIdPersona=token.id_persona
        let resultPersona=await persona.consultarPorId()
        postgresql.cerrarConexion(cliente)
        if(resultPersona.rowCount>0){
            respuesta.codigo_respuesta=200
            respuesta.tipo_mensaje="success"
            respuesta.mensaje_respuesta="consulta completada"
            respuesta.datos_respuesta=resultPersona.rows[0]
            res.status(200).json(respuesta)
        }
        else{
            respuesta.codigo_respuesta=404
            respuesta.tipo_mensaje="danger"
            respuesta.mensaje_respuesta="el recurso no a sido encontrado"
            res.status(404).json(respuesta)
        }
    },

    actualizar:async (req:Request,res:Response) => {
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:""
        }
        let { postgresql, cliente, token } = req.body
        let {nick_name, nombre, apellido } = req.body
        let { id } = req.params
        if(token.id_persona == id ){
            let persona_obj={
                id_persona:token.id_persona,
                nick_name,
                nombre, 
                apellido
            }
            let persona:ModeloPersona= new ModeloPersona(postgresql,cliente)
            persona.setIdPersona=id
            let resultPersona=await persona.consultarPorId()
            if(resultPersona.rowCount===1){
                persona.setDatos=persona_obj
                let resultPersona2=await persona.actualizar()
                postgresql.cerrarConexion(cliente)
                if(resultPersona2.rowCount===1){
                    respuesta.codigo_respuesta=200
                    respuesta.tipo_mensaje="success"
                    respuesta.mensaje_respuesta="recurso actualizado"
                    res.status(200).json(respuesta)
                }
            }
            else{
                respuesta.codigo_respuesta=404
                respuesta.tipo_mensaje="danger"
                respuesta.mensaje_respuesta="el recurso no a sido encontrado"
                res.status(404).json(respuesta)
            }
        }
        else{
            respuesta.codigo_respuesta=400
            respuesta.tipo_mensaje="danger"
            respuesta.mensaje_respuesta="el id no coincide"
            res.status(400).json(respuesta)
        }
    },

    // eliminar:async (req:Request,res:Response) => {

    // },



}

export default ControladorPersona