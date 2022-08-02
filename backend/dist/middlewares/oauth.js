"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../utils/token"));
let oAuth = async (req, res, next) => {
    let respuesta = {
        codigo_respuesta: 0,
        tipo_mensaje: "",
        mensaje_respuesta: ""
    };
    let authorization = req.headers.authorization;
    if (authorization !== "") {
        if (req.headers.authorization !== undefined) {
            let expresionBearer1 = /bearer/g;
            let expresionBearer2 = /Bearer/g;
            if (expresionBearer1.test(authorization) || expresionBearer2.test(authorization)) {
                if (authorization.split(" ").length === 2) {
                    let authorizationArray = authorization.split(" ");
                    let tokenEncriptado = authorizationArray[1];
                    try {
                        let tokenCifrado = token_1.default.validarToken(tokenEncriptado);
                        req.body.token = tokenCifrado;
                        next();
                    }
                    catch (error) {
                        respuesta = {
                            codigo_respuesta: 401,
                            tipo_mensaje: "danger",
                            mensaje_respuesta: "error al codificar el token, el token a sido alterado",
                        };
                        res.status(401).json(respuesta);
                    }
                }
                else {
                    respuesta = {
                        codigo_respuesta: 401,
                        tipo_mensaje: "danger",
                        mensaje_respuesta: "el formato no es valido tiene que ser de la siguiente forma (Bearer token)",
                    };
                    res.status(401).json(respuesta);
                }
            }
            else {
                respuesta = {
                    codigo_respuesta: 401,
                    tipo_mensaje: "danger",
                    mensaje_respuesta: "no se a encontrado el Bearer en el authorization",
                };
                res.status(401).json(respuesta);
            }
        }
        else {
            respuesta = {
                codigo_respuesta: 401,
                tipo_mensaje: "danger",
                mensaje_respuesta: "no se a encontrado el encabezado authorization",
            };
            res.status(401).json(respuesta);
        }
    }
    else {
        respuesta = {
            codigo_respuesta: 401,
            tipo_mensaje: "danger",
            mensaje_respuesta: "el authorization no puede estar vacio",
        };
        res.status(401).json(respuesta);
    }
};
exports.default = oAuth;
