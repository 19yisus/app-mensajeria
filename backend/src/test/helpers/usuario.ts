import supertest from "supertest";
import {app} from "../../index";
import ModeloUsuario from "../../models/m_usuario";
import cifrado from "../../utils/cifrado";
import {POSTGRESQL,CLIENTE} from "../../utils/postgresql"

let api = supertest(app)

let helper = {

    datos: [
        {
            id_persona: "1",
            correo: "kendomurft@gmail.com",
            telefono: "11111111111",
            clave: "soy_mega_furro",
            pregunta_1: "soy bato",
            pregunta_2: "seguro que soy bato",
            respuesta_1: "si",
            respuesta_2: "no se"
        },
        {
            id_persona: "2",
            correo: "rakkun@gmail.com",
            telefono: "22222222222",
            clave: "soy_mega_tanuki",
            pregunta_1: "soy una ardilla",
            pregunta_2: "pienso",
            respuesta_1: "si",
            respuesta_2: "no por que eres vtuber"
        },

    ],

    precargarDatos: async function(){
        return await CLIENTE.then(async cliente => {
            this.datos.forEach(async dato => {
                let modeloUsuario:ModeloUsuario = new ModeloUsuario(POSTGRESQL,cliente)
                dato.clave=await cifrado.cifrarClave(dato.clave)
                modeloUsuario.setDatos=dato
                await modeloUsuario.registrar()
            });
            // POSTGRESQL.cerrarConexion(cliente)
        })
        .catch(error => {
            console.log("error al crear el cliente de postgresql")
            console.log(error)
        })
    },

    borrarDatos: async function(){
        return await CLIENTE.then(async cliente => {
            await POSTGRESQL.query(cliente,"DELETE FROM tusuario;")
            await POSTGRESQL.query(cliente,"ALTER SEQUENCE tusuario_id_usuario_seq RESTART WITH 1;")
        })
        .catch(error => {
            console.log("error al crear el cliente de postgresql")
            console.log(error)
        })
    }

}


export {
    api,
    helper
}