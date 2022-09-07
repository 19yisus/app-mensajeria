"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const persona_1 = require("./helpers/persona");
// TODO precargar datos de persona
// TODO precargar datos de usuario u usar los datos pre cargados de persona
// TODO hacer test de registros de persona
// TODO hacer test de registros de usuaario
// TODO hacer test de login con los datos pre cargados
beforeEach(async () => {
    await persona_1.helper.precargarDatos();
    // await helperUsuario.precargarDatos()
});
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
        expect(response.body.datos_respuesta.length).toBe(1);
    });
    // test("registro de persona enviando datos vacios", async () => {
    //     let datos = {
    //         "id_persona":"",
    //         "nick_name":"",
    //         "nombre":"", 
    //         "apellido":""
    //     }
    //     let response = await api.post("/api/v1/persona/registrar")
    //     .send(datos)
    //     .expect(400)
    //     expect(response.body.detalle_respuesta.errores).toHaveLength(3)
    // })
});
