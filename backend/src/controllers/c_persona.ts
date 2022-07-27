import { Request, Response } from "express"
import { QueryResult } from "pg"
import { Console } from "winston/lib/winston/transports"
import personaInterface from "../interfaces/types/models/persona"
import respuestaServidor from "../interfaces/types/respuesta_servidor"
import ModeloPersona from "../models/m_persona"

let ControladorPersona = {

    registrar:async (req:Request,res:Response) => {
        let { postgresql, cliente } = req.body
        let { nick_name, nombre, apellido } = req.body
        let respuesta:respuestaServidor={
            codigo_respuesta:0,
            tipo_mensaje:"",
            mensaje_respuesta:"",
        }
        let persona:personaInterface={
            id_persona:"",
            nick_name,
            nombre, 
            apellido
        }
        console.log(persona)
        let persona_modelo:ModeloPersona=new ModeloPersona(postgresql,cliente)
        persona_modelo.setDatos=persona
        let result:QueryResult=await persona_modelo.consultarPorNickName()
        if(result.rowCount>0){
            respuesta={
                codigo_respuesta:400,
                tipo_mensaje:"warning",
                mensaje_respuesta:"el registro puedo ser procesado por que le nick '"+persona.nick_name+"' ya esta en uso",
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
        let { postgresql, cliente } = req.body
        // let 
    },

    consultarPorNickName:async (req:Request,res:Response) => {

    },

    consultarTodo:async (req:Request,res:Response) => {

    },

    actualizar:async (req:Request,res:Response) => {

    },

    eliminar:async (req:Request,res:Response) => {

    },



}

export default ControladorPersona