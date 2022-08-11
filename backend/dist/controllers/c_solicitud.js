"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// modelos
const m_solicitud_1 = __importDefault(require("../models/m_solicitud"));
const ControladorSolicitud = {
    enviarSolicitud: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { id_solicita } = req.body;
        let modeloSolicitud = new m_solicitud_1.default(postgresql, cliente);
        modeloSolicitud.setIdSolicita = id_solicita;
        modeloSolicitud.setIdUsuario = token.id_usuario;
        let resultSolicitud = await modeloSolicitud.registrar();
        await postgresql.cerrarConexion(cliente);
        if (resultSolicitud.rowCount === 1) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "solicitud enviada con exito",
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
    consultarMisSolicitudesEspera: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let modeloSolicitud = new m_solicitud_1.default(postgresql, cliente);
        modeloSolicitud.setIdSolicita = token.id_usuario;
        let resultSolicitud = await modeloSolicitud.consultarMisSolicitudesEspera();
        await postgresql.cerrarConexion(cliente);
        if (resultSolicitud.rowCount > 0) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "consulta completada",
                datos_respuesta: resultSolicitud.rows
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 404,
                tipo_mensaje: "danger",
                mensaje_respuesta: "no tines solicitudes",
            };
            res.status(404).json(respuesta);
        }
    },
    aceptarSolicitud: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { id } = req.params;
        let modeloSolicitud = new m_solicitud_1.default(postgresql, cliente);
        modeloSolicitud.setIdSolicita = token.id_usuario;
        modeloSolicitud.setIdSolicitud = id;
        let resultSolicitud = await modeloSolicitud.aceptarSolicitud();
        await postgresql.cerrarConexion(cliente);
        if (resultSolicitud.rowCount === 1) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "solicitud aceptada"
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al aceptar la solicitud",
            };
            res.status(400).json(respuesta);
        }
    },
    rechazarSolicitud: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { id } = req.params;
        let modeloSolicitud = new m_solicitud_1.default(postgresql, cliente);
        modeloSolicitud.setIdSolicita = token.id_usuario;
        modeloSolicitud.setIdSolicitud = id;
        let resultSolicitud = await modeloSolicitud.rechazarSolicitud();
        await postgresql.cerrarConexion(cliente);
        if (resultSolicitud.rowCount === 1) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "solicitud rechazada"
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al rechazar la solicitud",
            };
            res.status(400).json(respuesta);
        }
    },
    consultarMisSolicitudesEnviadas: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let modeloSolicitud = new m_solicitud_1.default(postgresql, cliente);
        modeloSolicitud.setIdUsuario = token.id_usuario;
        let resultSolicitud = await modeloSolicitud.consultarMisSolicitudes();
        await postgresql.cerrarConexion(cliente);
        if (resultSolicitud.rowCount > 0) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "consulta completada",
                datos_respuesta: resultSolicitud.rows
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 404,
                tipo_mensaje: "danger",
                mensaje_respuesta: "no solicitudes",
            };
            res.status(404).json(respuesta);
        }
    },
    borrarSolicitudEnviada: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { id } = req.params;
        let modeloSolicitud = new m_solicitud_1.default(postgresql, cliente);
        modeloSolicitud.setIdUsuario = token.id_usuario;
        modeloSolicitud.setIdSolicitud = id;
        let resultSolicitud = await modeloSolicitud.borrarSolicitudEnviada();
        await postgresql.cerrarConexion(cliente);
        if (resultSolicitud.rowCount === 1) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "solicitud borrada con exito"
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "no se pudo borrar la solicitud hay posibilidad que la solicitud que intinto borrar no se suya",
            };
            res.status(400).json(respuesta);
        }
    }
};
exports.default = ControladorSolicitud;
