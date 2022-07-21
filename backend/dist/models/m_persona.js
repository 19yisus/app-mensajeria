"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ModeloPersona {
    constructor(postgresql_, cliente_, persona) {
        if (persona !== undefined) {
            this.id_persona = persona.id_persona;
            this.nick_name = persona.nick_name;
            this.nombre = persona.nombre;
            this.apellido = persona.nombre;
        }
        else {
            this.id_persona = "";
            this.nick_name = "";
            this.nombre = "";
            this.apellido = "";
        }
        this.postgresql = postgresql_;
        this.cliente = cliente_;
    }
    set setIdPersona(id) {
        this.id_persona = id;
    }
    get getIdPersona() {
        return this.id_persona;
    }
    set setDatos(persona) {
        this.id_persona = persona.id_persona;
        this.nick_name = persona.nick_name;
        this.nombre = persona.nombre;
        this.apellido = persona.apellido;
    }
    registrar() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO tpersona(nick_name,nombre,apellido) VALUES ($1,$2,$3);";
            let datos = [this.nick_name, this.nombre, this.apellido];
            return yield this.postgresql.query(this.cliente, sql, datos);
        });
    }
    consultarPorId() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM tpersona WHERE id_persona=$1";
            let datos = [this.id_persona];
            return yield this.postgresql.query(this.cliente, sql, datos);
        });
    }
    consultarPorNickName() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM tpersona WHERE nick_name=$1";
            let datos = [this.nick_name];
            return yield this.postgresql.query(this.cliente, sql, datos);
        });
    }
    consultarTodo() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM tpersona";
            return yield this.postgresql.query(this.cliente, sql);
        });
    }
    actualizar() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE tpersona SET nick_name=$1,nombre=$2,apellido=$3 WHERE id_persona=$4;";
            let datos = [this.nick_name, this.nombre, this.apellido];
            return yield this.postgresql.query(this.cliente, sql, datos);
        });
    }
    eliminar() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "DELETE FROM tpersona WHERE id_persona=$1";
            let datos = [this.id_persona];
            return yield this.postgresql.query(this.cliente, sql, datos);
        });
    }
}
exports.default = ModeloPersona;
