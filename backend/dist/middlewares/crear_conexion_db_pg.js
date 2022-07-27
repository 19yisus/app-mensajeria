"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = __importDefault(require("../database/postgresql"));
let crearConexion = async (req, res, next) => {
    const POSTGRESQL = new postgresql_1.default();
    const CLIENTE = await POSTGRESQL.conectar();
    req.body["postgresql"] = POSTGRESQL;
    req.body["cliente"] = CLIENTE;
    next();
};
exports.default = crearConexion;
