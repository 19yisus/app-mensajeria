"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// modelos
const m_usuario_1 = __importDefault(require("../models/m_usuario"));
// utilidades
const cifrado_1 = __importDefault(require("../utils/cifrado"));
const ControladorUsuario = {
    registrar: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente } = req.body;
        let { id_persona, correo, telefono, clave, pregunta_1, pregunta_2, respuesta_1, respuesta_2 } = req.body;
        let usuario = {
            id_usuario: "",
            id_persona,
            correo,
            telefono,
            clave,
            pregunta_1,
            pregunta_2,
            respuesta_1,
            respuesta_2,
            estado_usuario: ""
        };
        usuario.clave = cifrado_1.default.cifrarClave(usuario.clave);
        let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
        modeloUsuario.setDatos = usuario;
        let resultUsuario = await modeloUsuario.registrar();
        await postgresql.cerrarConexion(cliente);
        if (resultUsuario.rowCount > 0) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "registro completado",
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al registrar",
            };
            res.status(400).json(respuesta);
        }
    },
    consultarUsuarioPorId: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente } = req.body;
        let { id } = req.params;
        let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
        modeloUsuario.setIdUsuario = id;
        let resultUsuario = await modeloUsuario.consultarIdUsuario();
        await postgresql.cerrarConexion(cliente);
        if (resultUsuario.rowCount > 0) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "consulta completada",
                datos_respuesta: resultUsuario.rows[0]
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 404,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al consultar no se a encontrado el recurso",
            };
            res.status(404).json(respuesta);
        }
    },
    consultarTodo: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente } = req.body;
        let { id } = req.params;
        let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
        let resultUsuario = await modeloUsuario.consultarTodo();
        await postgresql.cerrarConexion(cliente);
        if (resultUsuario.rowCount > 0) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "consulta completada",
                datos_respuesta: resultUsuario.rows
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 404,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al consultar no se a encontrado el recurso",
            };
            res.status(404).json(respuesta);
        }
    },
    consultarUsuarioPorIdPersona: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente } = req.body;
        let { id } = req.params;
        let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
        modeloUsuario.setIdPersona = id;
        let resultUsuario = await modeloUsuario.consultarIdPersona();
        await postgresql.cerrarConexion(cliente);
        if (resultUsuario.rowCount > 0) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "consulta completada",
                datos_respuesta: resultUsuario.rows[0]
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 404,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al consultar no se a encontrado el recurso",
            };
            res.status(404).json(respuesta);
        }
    },
};
exports.default = ControladorUsuario;