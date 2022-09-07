"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = exports.api = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const m_usuario_1 = __importDefault(require("../../models/m_usuario"));
const cifrado_1 = __importDefault(require("../../utils/cifrado"));
const postgresql_1 = require("../../utils/postgresql");
let api = (0, supertest_1.default)(index_1.app);
exports.api = api;
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
    precargarDatos: async function () {
        return await postgresql_1.CLIENTE.then(async (cliente) => {
            this.datos.forEach(async (dato) => {
                let modeloUsuario = new m_usuario_1.default(postgresql_1.POSTGRESQL, cliente);
                dato.clave = await cifrado_1.default.cifrarClave(dato.clave);
                modeloUsuario.setDatos = dato;
                await modeloUsuario.registrar();
            });
            // POSTGRESQL.cerrarConexion(cliente)
        })
            .catch(error => {
            console.log("error al crear el cliente de postgresql");
            console.log(error);
        });
    },
    borrarDatos: async function () {
        return await postgresql_1.CLIENTE.then(async (cliente) => {
            await postgresql_1.POSTGRESQL.query(cliente, "DELETE FROM tusuario;");
            await postgresql_1.POSTGRESQL.query(cliente, "ALTER SEQUENCE tusuario_id_usuario_seq RESTART WITH 1;");
        })
            .catch(error => {
            console.log("error al crear el cliente de postgresql");
            console.log(error);
        });
    }
};
exports.helper = helper;
