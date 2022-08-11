"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
// metodos a agregar 
class ModeloSolicitud {
    id_solicitud;
    id_usuario_solicito;
    id_solicita;
    estado_solicitud;
    fecha_solicitud;
    postgresql;
    cliente;
    constructor(postgresql_, cliente_) {
        this.id_solicitud = "";
        this.id_usuario_solicito = "";
        this.id_solicita = "";
        this.estado_solicitud = "";
        this.fecha_solicitud = "";
        this.postgresql = postgresql_;
        this.cliente = cliente_;
    }
    set setDatos(solicitud) {
        this.id_solicitud = solicitud.id_solicitud;
        this.id_usuario_solicito = solicitud.id_usuario_solicito;
        this.id_solicita = solicitud.id_solicita;
        this.estado_solicitud = solicitud.estado_solicitud;
        this.fecha_solicitud = solicitud.fecha_solicitud;
    }
    set setIdSolicitud(id) {
        this.id_solicitud = id;
    }
    set setIdUsuario(id) {
        // quien mando la solicitud
        this.id_usuario_solicito = id;
    }
    set setIdSolicita(id) {
        // a quien le mando la solicitud
        this.id_solicita = id;
    }
    set setIdEstadoSolicitud(estado) {
        // a quien le mando la solicitud
        this.estado_solicitud = estado;
    }
    async registrar() {
        // estado solicitud 
        //  a -> acepto
        //  e -> en espera
        //  r -> rechazado
        let fecha = (0, moment_1.default)().format("YYYY-MM-DD");
        let sql = `INSERT INTO tsolicitud(
            id_usuario_solicito,
            id_solicita,
            estado_solicitud,
            fecha_solicitud
        )
        VALUES(
            $1,
            $2,
            $3,
            $4
        )
        RETURNING id_solicitud;
        `;
        let datos = [this.id_usuario_solicito, this.id_solicita, "e", fecha];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarMisSolicitudesEspera() {
        let sql = `SELECT * FROM 
        tpersona,
        tusuario,
        tsolicitud 
        WHERE 
        tsolicitud.id_solicita=$1 AND 
        tsolicitud.estado_solicitud=$2 AND 
        tusuario.id_usuario=tsolicitud.id_usuario_solicito AND 
        tpersona.id_persona=tusuario.id_persona; `;
        let id_solicita_numero = this.id_solicita;
        let datos = [id_solicita_numero, "e"];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarMisSolicitudes() {
        let sql = `SELECT * FROM 
        tpersona,
        tusuario,
        tsolicitud 
        WHERE 
        tsolicitud.id_usuario_solicito=$1 AND
        tusuario.id_usuario=tsolicitud.id_usuario_solicito AND 
        tpersona.id_persona=tusuario.id_persona; `;
        let id_usuario_solicito = this.id_usuario_solicito;
        let datos = [id_usuario_solicito];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async aceptarSolicitud() {
        let sql = `UPDATE tsolicitud SET
        estado_solicitud=$1
        WHERE 
        id_solicitud=$2 AND
        id_solicita=$3;
        `;
        let datos = ["a", this.id_solicitud, this.id_solicita];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async rechazarSolicitud() {
        let sql = `UPDATE tsolicitud SET
        estado_solicitud=$1
        WHERE 
        id_solicitud=$2 AND
        id_solicita=$3;
        `;
        let datos = ["r", this.id_solicitud, this.id_solicita];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarMisSolicitudesEnviadas() {
        let sql = `SELECT * FROM 
        tpersona,
        tusuario,
        tsolicitud 
        WHERE 
        tsolicitud.id_usuario_solicito=$1 AND
        tusuario.id_usuario=tsolicitud.id_solicita AND
        tpersona.id_persona=tusuario.id_persona;
        `;
        let datos = [this.id_solicita, "e"];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async borrarSolicitudEnviada() {
        // DELETE FROM tsolicitud WHERE id_solicitud=4 AND id_usuario_solicito=1;
        let sql = `DELETE FROM tsolicitud WHERE id_solicitud=$1 AND id_usuario_solicito=$2;`;
        let id_solicitud_ = this.id_solicitud;
        let id_usuario_solicito_ = this.id_usuario_solicito;
        let datos = [id_solicitud_, id_usuario_solicito_];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
}
exports.default = ModeloSolicitud;
