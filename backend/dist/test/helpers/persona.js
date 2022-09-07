"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = exports.api = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const m_persona_1 = __importDefault(require("../../models/m_persona"));
const postgresql_1 = require("../../utils/postgresql");
let api = (0, supertest_1.default)(index_1.app);
exports.api = api;
let helper = {
    datos: [
        {
            "id_persona": "",
            "nick_name": "kendomurft",
            "nombre": "kendo",
            "apellido": "vacio"
        },
        {
            "id_persona": "",
            "nick_name": "rakkun",
            "nombre": "ardilla",
            "apellido": "vacio"
        },
        {
            "id_persona": "",
            "nick_name": "karama",
            "nombre": "cuervo",
            "apellido": "vacio"
        },
        {
            "id_persona": "",
            "nick_name": "condesa",
            "nombre": "demonio horny",
            "apellido": "vacio"
        }
    ],
    precargarDatos: async function () {
        return await postgresql_1.CLIENTE.then(async (cliente) => {
            this.datos.forEach(async (persona) => {
                let modeloPersona = new m_persona_1.default(postgresql_1.POSTGRESQL, cliente);
                modeloPersona.setDatos = persona;
                await modeloPersona.registrar();
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
            await postgresql_1.POSTGRESQL.query(cliente, "DELETE FROM tpersona;");
            await postgresql_1.POSTGRESQL.query(cliente, "ALTER SEQUENCE tpersona_id_persona_seq RESTART WITH 1;");
        })
            .catch(error => {
            console.log("error al crear el cliente de postgresql");
            console.log(error);
        });
    }
};
exports.helper = helper;
