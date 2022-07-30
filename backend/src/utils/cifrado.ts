import sjcl, { SjclCipherEncrypted } from "sjcl";
import dotEnv from "dotenv";
import path from "path"
dotEnv.config({ path: path.resolve(__dirname, '../../.env') })
let { CLAVE_SECRETA }= process.env

let llaveCifrado=CLAVE_SECRETA as unknown as string

let cifrado = {
    cifrarClave : (claveSinCifrar:string) => {
        const claveCifrada:SjclCipherEncrypted = sjcl.encrypt(llaveCifrado,claveSinCifrar)
        return claveCifrada
    },
    decifrarClave : (claveHaComparar:SjclCipherEncrypted) => {
        return sjcl.decrypt(llaveCifrado,claveHaComparar)
    }
}

export default cifrado