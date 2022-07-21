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
            this.id_persona = 0;
            this.nick_name = "";
            this.nombre = "";
            this.apellido = "";
        }
        this.postgresql = postgresql_;
        this.cliente = cliente_;
    }
    registrar() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    consultar() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    consultarTodo() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    actualizar() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    eliminar() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = ModeloPersona;
