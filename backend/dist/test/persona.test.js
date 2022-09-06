"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const persona_1 = require("./helpers/persona");
beforeEach(async () => {
    await persona_1.helper.precargarDatos();
});
// afterEach(async () => {
// })
describe("test del modulo persona", () => {
    test("registro de persona con todos los datos", async () => {
        let datos = {
            "id_persona": "",
            "nick_name": "botan",
            "nombre": "botan",
            "apellido": "shishiro"
        };
        let response = await persona_1.api.post("/api/v1/persona/registrar")
            .send(datos)
            .expect(200);
        console.log(response.body);
        expect(response.body.datos_respuesta.length).toBe(1);
    });
    test("registro de persona enviando datos vacios", async () => {
        let datos = {
            "id_persona": "",
            "nick_name": "",
            "nombre": "",
            "apellido": ""
        };
        let response = await persona_1.api.post("/api/v1/persona/registrar")
            .send(datos)
            .expect(400);
        // console.log(response.body.detalle_respuesta.errores)
        expect(response.body.detalle_respuesta.errores).toHaveLength(3);
    });
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
});
