import jwt, { JwtPayload } from "jsonwebtoken"
import dotEnv from "dotenv";
import path from "path"
dotEnv.config({ path: path.resolve(__dirname, '../../.env') })

const CLAVE_SECRETA = process.env.CLAVE_SECRETA
let llave =CLAVE_SECRETA as unknown as string

const token_utilidad = {

    crearToken:(datosPayLoad:any):string=> {
        const payload = datosPayLoad
        let token:string= jwt.sign(payload,llave)
        return token
    },

    validarToken:(token:string):JwtPayload => {
        const payload:JwtPayload=jwt.verify(token,llave) as JwtPayload
        return payload
    }

}

export default token_utilidad