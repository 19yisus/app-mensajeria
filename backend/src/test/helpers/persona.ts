import supertest from "supertest";
import {app, servidor} from "../../index";
import ModeloPersona from "../../models/m_persona"
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
            "apellido":" vacio "
        },
        {
            "id_persona":"",
            "nick_name":"karama",
            "nombre":"cuervo", 
            "apellido":" vacio "
        },
        {
            "id_persona":"",
            "nick_name":"condesa",
            "nombre":"demonio horny", 
            "apellido":" vacio "
        }
    ],

    precargarDatos: function(){
        CLIENTE.then(cliente => {
            let modeloPersona:ModeloPersona = new ModeloPersona(POSTGRESQL,cliente)
            this.datos.forEach(persona => {
                console.log(persona)
            });
        })
        .catch(error => {
            console.log("error al crear el cliente de postgresql")
        })

    }


}


export {
    api,
    helper
}