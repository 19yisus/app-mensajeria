import supertest from "supertest";
import {app, servidor} from "../../index";
import ModeloUsuario from "../../models/m_usuario"
import {POSTGRESQL,CLIENTE} from "../../utils/postgresql"

let api = supertest(app)

let helper = {

    datos: [
        {
            "id_persona":"",
            "nick_name":"kendomurft",
            "nombre":"kendo", 
            "apellido":"vacio"
        },
        {
            "id_persona":"",
            "nick_name":"rakkun",
            "nombre":"ardilla", 
            "apellido":"vacio"
        },
        {
            "id_persona":"",
            "nick_name":"karama",
            "nombre":"cuervo", 
            "apellido":"vacio"
        },
        {
            "id_persona":"",
            "nick_name":"condesa",
            "nombre":"demonio horny", 
            "apellido":"vacio"
        }
    ],

    precargarDatos: async function(){
        return await CLIENTE.then(async cliente => {
            // await POSTGRESQL.query(cliente,"DELETE FROM tpersona;")
            // await POSTGRESQL.query(cliente,"ALTER SEQUENCE tpersona_id_persona_seq RESTART WITH 1;")
            // this.datos.forEach(persona => {
            //     let modeloPersona:ModeloPersona = new ModeloPersona(POSTGRESQL,cliente)
            //     modeloPersona.setDatos=persona
            //     modeloPersona.registrar()
            // });
            // POSTGRESQL.cerrarConexion(cliente)
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