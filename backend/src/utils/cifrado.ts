import bcryptjs from "bcryptjs"
import dotEnv from "dotenv";
import path from "path"
dotEnv.config({ path: path.resolve(__dirname, '../../.env') })
let { SAL_CRIPTO }= process.env

let cifrado = {
    cifrarClave : async (claveSinCifrar:string):Promise<string> => {
        let salt:string=await bcryptjs.genSalt(15)
        let hash:string=await bcryptjs.hash(claveSinCifrar,salt)
        return hash
    },
    compararClave:async (clave:string,calveHash:string):Promise<boolean> =>{
        return bcryptjs.compare(clave,calveHash)
    }
}

export default cifrado