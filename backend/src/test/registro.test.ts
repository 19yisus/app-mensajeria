import { api, helper as helperPersona } from "./helpers/persona";
import {  helper as helperUsuario } from "./helpers/usuario";

// TODO hacer test de registros de usuario sin enviar datos
// TODO hacer test de registro de usuario enviando un correo ya en uso
// TODO hacer test de registro de usuario enviando un telefono ya en uso
// TODO hacer test de registro de usuario enviando un id de persona ya en uso

jest.setTimeout(200000)

beforeAll(async () => {
    await helperPersona.borrarDatos()
    await helperUsuario.borrarDatos()
    await helperPersona.precargarDatos()
    await helperUsuario.precargarDatos()
})

describe("test de creacion de usuario: ", () => {

    test("registro de persona con todos los datos", async () => {
        let datos = {
            "id_persona":"",
            "nick_name":"botan",
            "nombre":"botan", 
            "apellido":"shishiro"
        }
        let response = await api.post("/api/v1/persona/registrar")
        .send(datos)
        .expect(200)
        expect(response.body.datos_respuesta.length).toBe(1)
    })

    test("registro de persona enviando datos vacios", async () => {
        let datos = {
            "id_persona":"",
            "nick_name":"",
            "nombre":"", 
            "apellido":""
        }
        let response = await api.post("/api/v1/persona/registrar")
        .send(datos)
        .expect(400)
        expect(response.body.detalle_respuesta.errores).toHaveLength(3)
    })

    test("registro de usuario con todos los datos", async () => {    
        let datos2 = {
            id_persona: "3",
            correo: "karma@gmail.com",
            telefono: "33333333333",
            clave: "clave_test",
            pregunta_1: "pregunta_1",
            pregunta_2: "pregunta_2",
            respuesta_1: "respuesta_1",
            respuesta_2: "respuesta_2"
        }
        let response2 = await api.post("/api/v1/usuario/registrar")
        .send(datos2)
        .expect(200)
        expect(response2.body.codigo_respuesta).toBe(200)
    })

    // test("registro de usuario sin enviar datos", async () => {    
    //     let datos2 = {
    //         id_persona: "",
    //         correo: "",
    //         telefono: "",
    //         clave: "",
    //         pregunta_1: "",
    //         pregunta_2: "",
    //         respuesta_1: "",
    //         respuesta_2: ""
    //     }
    //     let response2 = await api.post("/api/v1/usuario/registrar")
    //     .send(datos2)
    //     .expect(400)
    //     expect(response2.body.codigo_respuesta).toBe(400)
    // })

})

// afterAll(async () => {
//     await helperPersona.borrarDatos()
//     await helperUsuario.borrarDatos()
// })



