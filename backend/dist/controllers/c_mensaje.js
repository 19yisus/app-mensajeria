"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const m_contacto_1 = __importDefault(require("../models/m_contacto"));
const m_mensaje_1 = __importDefault(require("../models/m_mensaje"));
let ControladorMensaje = {
    crearMensaje: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token, id_cuarto, mensaje } = req.body;
        let { idCuarto } = req.params;
        let modeloMensaje = new m_mensaje_1.default(postgresql, cliente);
        if (idCuarto == id_cuarto) {
            modeloMensaje.setIdCuarto = id_cuarto;
            modeloMensaje.setIdUsuario = token.id_usuario;
            modeloMensaje.setMensaje = mensaje;
            modeloMensaje.setFecha = (0, moment_1.default)().format("YYYY-MM-DD");
            modeloMensaje.setHora = (0, moment_1.default)().format("H:mm:ss");
            let resultMensaje = await modeloMensaje.crearMensaje();
            if (resultMensaje.rowCount > 0) {
                respuesta = {
                    codigo_respuesta: 200,
                    tipo_mensaje: "success",
                    mensaje_respuesta: "mensaje enviado",
                };
                res.status(200).json(respuesta);
            }
            else {
                respuesta = {
                    codigo_respuesta: 400,
                    tipo_mensaje: "danger",
                    mensaje_respuesta: "error al crear el mensaje",
                };
                res.status(400).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "intento enviar un mensaje a un chat incorrepto",
            };
            res.status(400).json(respuesta);
        }
    },
    consultarMensajes: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { idCuarto } = req.params;
        let modeloContacto = new m_contacto_1.default(postgresql, cliente);
        let modeloMensaje = new m_mensaje_1.default(postgresql, cliente);
        modeloContacto.setIdUsuario = token.id_usuario;
        modeloContacto.setIdCuarto = idCuarto;
        let resultContacto = await modeloContacto.consultarPorIdUsuarioYIdCuarto();
        if (resultContacto.rowCount > 0) {
            modeloMensaje.setIdCuarto = idCuarto;
            let resultMensaje = await modeloMensaje.consultarMensajesDelChat();
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "consulta completada",
                datos_respuesta: {
                    mensajes: resultMensaje.rows,
                    totalMensajes: resultMensaje.rowCount
                }
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "no se ha encontrado el chat",
            };
            res.status(400).json(respuesta);
        }
    },
    paginarMensajes: async (req, res) => { },
    editarMensaje: async (req, res) => { },
    borrarMensaje: async (req, res) => { }
};
exports.default = ControladorMensaje;
