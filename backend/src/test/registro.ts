import { token } from "morgan";
import { api, helper as helperPersona} from "./helpers/persona";
import { helper as helperUsuario } from "./helpers/usuario";

// TODO hacer en este fichero el proceso de registro de usuario y de login
// TODO este fichero se encargara de emular el registro completo de usuario y login

beforeEach(async () => {
    await helperPersona.precargarDatos()
    await helperUsuario.precargarDatos()
})


describe("test del modulo persona", () => {

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
        // console.log(response.body)
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
        // console.log(response.body.detalle_respuesta.errores)
        expect(response.body.detalle_respuesta.errores).toHaveLength(3)
    })

    // test("Editar registro enviando datos", async () => {
    //     let datos = {
    //         "id_persona":"1",
    //         "nick_name":"kendomurft",
    //         "nombre":"kendito", 
    //         "apellido":"furry"
    //     }
    //     const token:string = "token"
    //     let response = await api.put(`/api/v1/persona/actualizar/${datos.id_persona}`)
    //     .set("Authorization",`Bearer token`)
    //     .send(datos)
    //     .expect(200)
    //     // console.log(response.body.detalle_respuesta.errores)
    //     expect(response.body.codigo_respuesta).toBe(200)
    // })

})