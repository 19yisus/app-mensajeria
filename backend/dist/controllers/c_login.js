"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cifrado_1 = __importDefault(require("../utils/cifrado"));
const token_1 = __importDefault(require("../utils/token"));
// modelos
const m_usuario_1 = __importDefault(require("../models/m_usuario"));
const ControladorLogin = {
    iniciarSesion: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente } = req.body;
        let { correo, clave } = req.body;
        let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
        modeloUsuario.setCorreo = correo;
        let resultUsuario = await modeloUsuario.consultarPorCorreo();
        await postgresql.cerrarConexion(cliente);
        if (resultUsuario.rowCount > 0) {
            let datosUsuario = resultUsuario.rows[0];
            if (await cifrado_1.default.compararClave(clave, datosUsuario.clave)) {
                let payload = {
                    id_usuario: datosUsuario.id_usuario,
                    nombre: datosUsuario.nombre,
                    apellido: datosUsuario.apellido,
                    nickname: datosUsuario.nick_name,
                    correo: datosUsuario.correo
                };
                let token = token_1.default.crearToken(payload);
                respuesta = {
                    codigo_respuesta: 200,
                    tipo_mensaje: "success",
                    mensaje_respuesta: "token creado",
                    token
                };
                res.status(200).json(respuesta);
            }
            else {
                console.log("la clave no coincide");
                respuesta = {
                    codigo_respuesta: 400,
                    tipo_mensaje: "danger",
                    mensaje_respuesta: "a clave no coincide",
                };
                res.status(400).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "usuario no encontrado",
            };
            res.status(400).json(respuesta);
            // usuario no encontrado
        }
    }
};
exports.default = ControladorLogin;
