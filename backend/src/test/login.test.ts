import { api } from "./helpers/persona";

describe("test del login", () => {

    test("login enviando datos", async () => {    
        let datos = {
            correo: "rakkun@gmail.com",
            clave: "soy_mega_tanuki",
        }
        let response = await api.post("/api/v1/login/iniciar-sesion")
        .send(datos)
        .expect(200)
        expect(response.body.codigo_respuesta).toBe(200)
    })

})
