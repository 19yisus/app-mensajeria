"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const m_persona_1 = __importDefault(require("../models/m_persona"));
let ControladorPersona = {
    registrar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { postgresql, cliente } = req.body;
        let { nick_name, nombre, apellido } = req.body;
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let persona = {
            id_persona: "",
            nick_name,
            nombre,
            apellido
        };
        console.log(persona);
        let persona_modelo = new m_persona_1.default(postgresql, cliente);
        persona_modelo.setDatos = persona;
        let result = yield persona_modelo.consultarPorNickName();
        if (result.rowCount > 0) {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "warning",
                mensaje_respuesta: "el registro puedo ser procesado por que le nick '" + persona.nick_name + "' ya esta en uso",
            };
            yield postgresql.cerrarConexion(cliente);
            res.status(400).json(respuesta);
        }
        if (result.rowCount === 0) {
            result = yield persona_modelo.registrar();
            if (result.rowCount > 0) {
                respuesta = {
                    codigo_respuesta: 200,
                    tipo_mensaje: "success",
                    mensaje_respuesta: "registro completado",
                };
                yield postgresql.cerrarConexion(cliente);
                res.status(200).json(respuesta);
            }
        }
    }),
    consultarPorId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { postgresql, cliente } = req.body;
        // let 
    }),
    consultarPorNickName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    consultarTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    actualizar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    eliminar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
};
exports.default = ControladorPersona;
