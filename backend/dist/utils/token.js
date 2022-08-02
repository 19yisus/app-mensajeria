"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const CLAVE_SECRETA = process.env.CLAVE_SECRETA;
let llave = CLAVE_SECRETA;
const JWToken = {
    crearToken: (datosPayLoad) => {
        const payload = datosPayLoad;
        let token = jsonwebtoken_1.default.sign(payload, llave);
        return token;
    },
    validarToken: (token) => {
        const payload = jsonwebtoken_1.default.verify(token, llave);
        return payload;
    }
};
exports.default = JWToken;
