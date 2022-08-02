"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
let { SAL_CRIPTO } = process.env;
let cifrado = {
    cifrarClave: async (claveSinCifrar) => {
        let salt = await bcryptjs_1.default.genSalt(15);
        let hash = await bcryptjs_1.default.hash(claveSinCifrar, salt);
        return hash;
    },
    compararClave: async (clave, calveHash) => {
        return await bcryptjs_1.default.compare(clave, calveHash);
    }
};
exports.default = cifrado;
