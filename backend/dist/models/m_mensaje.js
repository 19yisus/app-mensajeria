"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// metodos a agregar 
class ModeloMensaje {
    id_mensaje;
    id_cuarto;
    id_usuario;
    mensaje;
    fecha_mensaje;
    hora_mensaje;
    estado_mensaje;
    postgresql;
    cliente;
    constructor(postgresql_, cliente_) {
        this.id_mensaje = "";
        this.id_cuarto = "";
        this.id_usuario = "";
        this.mensaje = "";
        this.fecha_mensaje = "";
        this.hora_mensaje = "";
        this.estado_mensaje = "";
        this.postgresql = postgresql_;
        this.cliente = cliente_;
    }
    set setDatos(datos) {
        this.id_mensaje = datos.id_mensaje;
        this.id_cuarto = datos.id_cuarto;
        this.id_usuario = datos.id_usuario;
        this.mensaje = datos.mensaje;
        this.fecha_mensaje = datos.fecha_mensaje;
        this.hora_mensaje = datos.hora_mensaje;
        this.estado_mensaje = datos.estado_mensaje;
    }
    set setIdCuarto(id) {
        this.id_cuarto = id;
    }
    set setIdUsuario(id) {
        this.id_usuario = id;
    }
    set setMensaje(msj) {
        this.mensaje = msj;
    }
    set setFecha(fecha) {
        this.fecha_mensaje = fecha;
    }
    set setHora(hora) {
        this.hora_mensaje = hora;
    }
    async crearMensaje() {
        let sql = `INSERT INTO tmensaje(
            id_cuarto,
            id_usuario,
            mensaje,
            fecha_mensaje,
            hora_mensaje,
            estado_mensaje
        )
        VALUES(
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        ) RETURNING id_mensaje`;
        let id_cuarto_ = this.id_cuarto;
        let id_usuario_ = this.id_usuario;
        let datos = [id_cuarto_, id_usuario_, this.mensaje, this.fecha_mensaje, this.hora_mensaje, "1"];
        return this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarMensajesDelChat() {
        let sql = `SELECT * FROM 
        tpersona,
        tusuario,
        tmensaje
        WHERE
        tmensaje.id_cuarto=$1 AND
        tusuario.id_usuario=tmensaje.id_usuario AND
        tpersona.id_persona=tusuario.id_persona
        `;
        let id_cuarto_ = this.id_cuarto;
        let datos = [id_cuarto_];
        return this.postgresql.query(this.cliente, sql, datos);
    }
}
exports.default = ModeloMensaje;
