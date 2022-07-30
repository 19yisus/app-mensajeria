"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sjcl_1 = __importDefault(require("sjcl"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
let { CLAVE_SECRETA } = process.env;
let llaveCifrado = CLAVE_SECRETA;
let cifrado = {
    cifrarClave: (claveSinCifrar) => {
        const claveCifrada = sjcl_1.default.encrypt(llaveCifrado, claveSinCifrar);
        return claveCifrada;
    },
    decifrarClave: (claveHaComparar) => {
        return sjcl_1.default.decrypt(llaveCifrado, claveHaComparar);
    }
};
exports.default = cifrado;
