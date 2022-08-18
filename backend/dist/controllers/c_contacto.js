"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const m_contacto_1 = __importDefault(require("../models/m_contacto"));
let ControladorContacto = {
    consultarContactos: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
            datos_respuesta: []
        };
        let { postgresql, cliente, token } = req.body;
        let modeloContacto = new m_contacto_1.default(postgresql, cliente);
        modeloContacto.setIdUsuario = token.id_usuario;
        let resultContacto = await modeloContacto.consultarContactos();
        await postgresql.cerrarConexion(cliente);
        if (resultContacto.rowCount > 0) {
            respuesta = {
                codigo_respuesta: 200,
                tipo_mensaje: "success",
                mensaje_respuesta: "consulta completada",
                datos_respuesta: resultContacto.rows
            };
            res.status(200).json(respuesta);
        }
        else {
            respuesta = {
                codigo_respuesta: 404,
                tipo_mensaje: "danger",
                mensaje_respuesta: "no tienes contactos",
                datos_respuesta: []
            };
            res.status(404).json(respuesta);
        }
    },
    // eliminarContacto: async (req:Request,res:Response) =>{},
};
exports.default = ControladorContacto;
