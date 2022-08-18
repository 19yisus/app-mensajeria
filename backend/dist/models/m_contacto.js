"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// metodos a agregar 
class ModeloContacto {
    id_contacto;
    id_usuario;
    id_cuarto;
    contacto_id_usuario;
    estado_contacto;
    postgresql;
    cliente;
    constructor(postgresql_, cliente_) {
        this.id_contacto = "";
        this.id_usuario = "";
        this.id_cuarto = "";
        this.contacto_id_usuario = "";
        this.estado_contacto = "";
        this.postgresql = postgresql_;
        this.cliente = cliente_;
    }
}
exports.default = ModeloContacto;
