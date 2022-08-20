"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENTE = exports.POSTGRESQL = void 0;
const postgresql_1 = __importDefault(require("../database/postgresql"));
const POSTGRESQL = new postgresql_1.default();
exports.POSTGRESQL = POSTGRESQL;
const CLIENTE = POSTGRESQL.conectar();
exports.CLIENTE = CLIENTE;
