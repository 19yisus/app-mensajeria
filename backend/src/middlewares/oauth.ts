import { NextFunction, Request, Response } from "express"
import  jwt, { JwtPayload } from "jsonwebtoken"
import respuestaServidor from "../interfaces/types/respuesta_servidor"
import token_utilidad from "../utils/token"

let oAuth =async (req:Request,res:Response,next:NextFunction) => {
    let respuesta:respuestaServidor={
        codigo_respuesta:0,
        tipo_mensaje:"",
        mensaje_respuesta:""
    }
    let authorization:string= req.headers.authorization as unknown as string
    if(authorization!==""){
        if(req.headers.authorization!==undefined){
            let expresionBearer1:RegExp = /bearer/g
            let expresionBearer2:RegExp = /Bearer/g 
            if(expresionBearer1.test(authorization) || expresionBearer2.test(authorization)){
                if(authorization.split(" ").length===2){
                    let authorizationArray:string[]= authorization.split(" ")
                    let tokenEncriptado:string = authorizationArray[1]
                    try {
                        let tokenCifrado:JwtPayload=token_utilidad.validarToken(tokenEncriptado)
                        req.body.token=tokenCifrado
                        next()
                    } catch (error) {
                        respuesta={
                            codigo_respuesta:401,
                            tipo_mensaje:"danger",
                            mensaje_respuesta:"error al codificar el token, el token a sido alterado",
                        }
                        res.status(401).json(respuesta)
                    }
                }
                else{
                    respuesta={
                        codigo_respuesta:401,
                        tipo_mensaje:"danger",
                        mensaje_respuesta:"el formato no es valido tiene que ser de la siguiente forma (Bearer token)",
                    }
                    res.status(401).json(respuesta)
                }
            }
            else{
                respuesta={
                    codigo_respuesta:401,
                    tipo_mensaje:"danger",
                    mensaje_respuesta:"no se a encontrado el Bearer en el authorization",
                }
                res.status(401).json(respuesta)
            }
        }
        else{
            respuesta={
                codigo_respuesta:401,
                tipo_mensaje:"danger",
                mensaje_respuesta:"no se a encontrado el encabezado authorization",
            }
            res.status(401).json(respuesta)
        }
    }
    else{
        respuesta={
            codigo_respuesta:401,
            tipo_mensaje:"danger",
            mensaje_respuesta:"el authorization no puede estar vacio",
        }
        res.status(401).json(respuesta)
    }
    

}

export default oAuth
