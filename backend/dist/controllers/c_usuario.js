"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// modelos
const m_usuario_1 = __importDefault(require("../models/m_usuario"));
// utilidades
const cifrado_1 = __importDefault(require("../utils/cifrado"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
let { NODE_ENV } = process.env;
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
        usuario.clave = await cifrado_1.default.cifrarClave(usuario.clave);
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
        let { idUsuario } = req.params;
        let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
        modeloUsuario.setIdUsuario = idUsuario;
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
    consultarme: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
        modeloUsuario.setIdUsuario = token.id_usuario;
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
        let { idPersona } = req.params;
        let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
        modeloUsuario.setIdPersona = idPersona;
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
    activarCuenta: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { idUsuario } = req.params;
        if (token.id_usuario == idUsuario) {
            let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
            modeloUsuario.setIdUsuario = token.id_usuario;
            let resultUsuario = await modeloUsuario.activarUsuario();
            await postgresql.cerrarConexion(cliente);
            if (resultUsuario.rowCount > 0) {
                respuesta = {
                    codigo_respuesta: 200,
                    tipo_mensaje: "success",
                    mensaje_respuesta: "cuenta activa con exito",
                    datos_respuesta: resultUsuario.rows[0]
                };
                res.status(200).json(respuesta);
            }
            else {
                respuesta = {
                    codigo_respuesta: 404,
                    tipo_mensaje: "danger",
                    mensaje_respuesta: "error al activar la cuenta no se a podido encontra el usuario",
                };
                res.status(404).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al editar no puede editar un recurso que no sea de usted",
            };
            res.status(400).json(respuesta);
        }
    },
    desactivarCuenta: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { idUsuario } = req.params;
        if (token.id_usuario == idUsuario) {
            let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
            modeloUsuario.setIdUsuario = token.id_usuario;
            let resultUsuario = await modeloUsuario.desactivarUsuario();
            await postgresql.cerrarConexion(cliente);
            if (resultUsuario.rowCount > 0) {
                respuesta = {
                    codigo_respuesta: 200,
                    tipo_mensaje: "success",
                    mensaje_respuesta: "cuenta desactivada con exito",
                    datos_respuesta: resultUsuario.rows[0]
                };
                res.status(200).json(respuesta);
            }
            else {
                respuesta = {
                    codigo_respuesta: 404,
                    tipo_mensaje: "danger",
                    mensaje_respuesta: "error al desactivar la cuenta no se a podido encontra el usuario",
                };
                res.status(404).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al editar no puede editar un recurso que no sea de usted",
            };
            res.status(400).json(respuesta);
        }
    },
    actualizarTelefono: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { idUsuario } = req.params;
        let { telefono } = req.body;
        if (token.id_usuario == idUsuario) {
            let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
            modeloUsuario.setIdUsuario = token.id_usuario;
            modeloUsuario.setTelefono = telefono;
            let resultUsuario = await modeloUsuario.actualizarTelefono();
            await postgresql.cerrarConexion(cliente);
            if (resultUsuario.rowCount > 0) {
                respuesta = {
                    codigo_respuesta: 200,
                    tipo_mensaje: "success",
                    mensaje_respuesta: "telefono actualizado"
                };
                res.status(200).json(respuesta);
            }
            else {
                respuesta = {
                    codigo_respuesta: 400,
                    tipo_mensaje: "danger",
                    mensaje_respuesta: "error al actualizar el telefono",
                };
                res.status(400).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error al editar no puede editar un recurso que no sea de usted",
            };
            res.status(400).json(respuesta);
        }
    },
    consultarPreguntasSeguridad: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { idUsuario } = req.params;
        if (token.id_usuario == idUsuario) {
            let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
            modeloUsuario.setIdUsuario = token.id_usuario;
            let resultUsuario = await modeloUsuario.consultarPreguntasDeSeguridad();
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
                    mensaje_respuesta: "error no puede acceder a un recuros que no le pertenece",
                };
                res.status(404).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error no puede acceder a un recuros que no le pertenece",
            };
            res.status(400).json(respuesta);
        }
    },
    actualizarPreguntaDeSeguridad: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { idUsuario, numero } = req.params;
        let { pregunta_nueva, respuesta_nueva } = req.body;
        if (token.id_usuario == idUsuario) {
            let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
            modeloUsuario.setIdUsuario = token.id_usuario;
            let estadoActualizacion = false;
            if (numero === "1") {
                modeloUsuario.setPregunta1 = pregunta_nueva;
                modeloUsuario.setRespuesta1 = respuesta_nueva;
                let resultPreguntaUsuario = await modeloUsuario.actualizarPregunta1();
                let resultRespuestaUsuario = await modeloUsuario.actualizarRespuesta1();
                if (resultPreguntaUsuario.rowCount > 0 || resultRespuestaUsuario.rowCount > 0) {
                    estadoActualizacion = true;
                }
            }
            else {
                modeloUsuario.setPregunta2 = pregunta_nueva;
                modeloUsuario.setRespuesta2 = respuesta_nueva;
                let resultPreguntaUsuario = await modeloUsuario.actualizarPregunta2();
                let resultRespuestaUsuario = await modeloUsuario.actualizarRespuesta2();
                if (resultPreguntaUsuario.rowCount > 0 || resultRespuestaUsuario.rowCount > 0) {
                    estadoActualizacion = true;
                }
            }
            await postgresql.cerrarConexion(cliente);
            if (estadoActualizacion === true) {
                respuesta = {
                    codigo_respuesta: 200,
                    tipo_mensaje: "success",
                    mensaje_respuesta: `actualizacion completa de la pregunta o respuesta ${numero}`
                };
                res.status(200).json(respuesta);
            }
            else {
                respuesta = {
                    codigo_respuesta: 400,
                    tipo_mensaje: "danger",
                    mensaje_respuesta: `error al actualizar la pregunta o respuesta ${numero}`,
                };
                res.status(400).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error no puede acceder a un recuros que no le pertenece",
            };
            res.status(400).json(respuesta);
        }
    },
    actualizarClave: async (req, res) => {
        let respuesta = {
            codigo_respuesta: 0,
            tipo_mensaje: "",
            mensaje_respuesta: "",
        };
        let { postgresql, cliente, token } = req.body;
        let { idUsuario } = req.params;
        let { respuesta_1, respuesta_2, clave_nueva } = req.body;
        if (token.id_usuario == idUsuario) {
            let modeloUsuario = new m_usuario_1.default(postgresql, cliente);
            modeloUsuario.setIdUsuario = token.id_usuario;
            modeloUsuario.setRespuesta1 = respuesta_1;
            modeloUsuario.setRespuesta2 = respuesta_2;
            let resultUsuarioPregunta1 = await modeloUsuario.compararRespuesta1();
            let resultUsuarioPregunta2 = await modeloUsuario.compararRespuesta2();
            if (resultUsuarioPregunta1.rowCount === 1 && resultUsuarioPregunta2.rowCount === 1) {
                modeloUsuario.setClave = await cifrado_1.default.cifrarClave(clave_nueva);
                let resultUsuario = await modeloUsuario.cambiarClave();
                await postgresql.cerrarConexion(cliente);
                if (resultUsuario.rowCount > 0) {
                    respuesta = {
                        codigo_respuesta: 200,
                        tipo_mensaje: "success",
                        mensaje_respuesta: "clave actualizada",
                    };
                    res.status(200).json(respuesta);
                }
                else {
                    respuesta = {
                        codigo_respuesta: 400,
                        tipo_mensaje: "danger",
                        mensaje_respuesta: "error al actualizar la clave",
                    };
                    res.status(400).json(respuesta);
                }
            }
            else {
                respuesta = {
                    codigo_respuesta: 400,
                    tipo_mensaje: "danger",
                    mensaje_respuesta: "error al actualizar por que no pudo responder correctamente las preguntas",
                };
                res.status(400).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 400,
                tipo_mensaje: "danger",
                mensaje_respuesta: "error no puede acceder a un recuros que no le pertenece",
            };
            res.status(400).json(respuesta);
        }
    }
};
exports.default = ControladorUsuario;
