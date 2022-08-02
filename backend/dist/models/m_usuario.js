"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// metodos a agregar 
class ModeloUsuario {
    id_usuario;
    id_persona;
    correo;
    telefono;
    clave;
    pregunta_1;
    pregunta_2;
    respuesta_1;
    respuesta_2;
    estado_usuario;
    postgresql;
    cliente;
    constructor(postgresql_, cliente_) {
        this.id_usuario = "";
        this.id_persona = "";
        this.correo = "";
        this.telefono = "";
        this.clave = "";
        this.pregunta_1 = "";
        this.pregunta_2 = "";
        this.respuesta_1 = "";
        this.respuesta_2 = "";
        this.estado_usuario = "";
        this.postgresql = postgresql_;
        this.cliente = cliente_;
    }
    set setDatos(usuario) {
        this.id_usuario = usuario.id_usuario;
        this.id_persona = usuario.id_persona;
        this.correo = usuario.correo;
        this.telefono = usuario.telefono;
        this.clave = usuario.clave;
        this.pregunta_1 = usuario.pregunta_1;
        this.pregunta_2 = usuario.pregunta_2;
        this.respuesta_1 = usuario.respuesta_1;
        this.respuesta_2 = usuario.respuesta_2;
        this.estado_usuario = usuario.estado_usuario;
    }
    set setIdUsuario(id) {
        this.id_usuario = id;
    }
    set setIdPersona(id) {
        this.id_persona = id;
    }
    set setTelefono(telefono_) {
        this.telefono = telefono_;
    }
    set setCorreo(correo_) {
        this.correo = correo_;
    }
    get getCorreo() {
        return this.correo;
    }
    set setRespuesta1(respuesta_1_) {
        this.respuesta_1 = respuesta_1_;
    }
    set setRespuesta2(respuesta_2_) {
        this.respuesta_2 = respuesta_2_;
    }
    set setClave(clave_) {
        this.clave = clave_;
    }
    async registrar() {
        let sql = "INSERT INTO tusuario(id_persona,correo,telefono,clave,pregunta_1,pregunta_2,respuesta_1,respuesta_2,estado_usuario) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id_usuario;";
        let datos = [this.id_persona, this.correo, this.telefono, this.clave, this.pregunta_1, this.pregunta_2, this.respuesta_1, this.respuesta_2, '1'];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarIdUsuario() {
        let sql = "SELECT * FROM tusuario,tpersona WHERE tpersona.id_persona=tusuario.id_persona AND tusuario.id_usuario=$1;";
        let datos = [this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarIdPersona() {
        let sql = "SELECT * FROM tusuario,tpersona WHERE tpersona.id_persona=tusuario.id_persona AND tusuario.id_persona=$1;";
        let datos = [this.id_persona];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarPorCorreo() {
        let sql = "SELECT * FROM tusuario,tpersona WHERE tpersona.id_persona=tusuario.id_persona AND tusuario.correo=$1;";
        let datos = [this.correo];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarTodo() {
        let sql = "SELECT * FROM tusuario,tpersona WHERE tpersona.id_persona=tusuario.id_persona;";
        let datos = [];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async actualizarCorreo() {
        let sql = "UPDATE tusuario SET correo=$1 WHERE id_usuario=$2;";
        let datos = [this.correo, this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async actualizarTelefono() {
        let sql = "UPDATE tusuario SET telefono=$1 WHERE id_usuario=$2;";
        let datos = [this.telefono, this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async actualizarPregunta1() {
        let sql = "UPDATE tusuario SET pregunta_1=$1 WHERE id_usuario=$2;";
        let datos = [this.pregunta_1, this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async actualizarPregunta2() {
        let sql = "UPDATE tusuario SET pregunta_2=$1 WHERE id_usuario=$2;";
        let datos = [this.pregunta_2, this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async actualizarRespuesta1() {
        let sql = "UPDATE tusuario SET respuesta_1=$1 WHERE id_usuario=$2;";
        let datos = [this.respuesta_1, this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async actualizarRespuesta2() {
        let sql = "UPDATE tusuario SET respuesta_2=$1 WHERE id_usuario=$2;";
        let datos = [this.respuesta_2, this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async activarUsuario() {
        let sql = "UPDATE tusuario SET estado_usuario=$1 WHERE id_usuario=$2;";
        let datos = ['1', this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async desactivarUsuario() {
        let sql = "UPDATE tusuario SET estado_usuario=$1 WHERE id_usuario=$2;";
        let datos = ['0', this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async compararRespuesta1() {
        let sql = "SELECT * FROM tusuario WHERE id_usuario=$1 AND respuesta_1=$2;";
        let datos = [this.id_usuario, this.respuesta_1];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async compararRespuesta2() {
        let sql = "SELECT * FROM tusuario WHERE id_usuario=$1 AND respuesta_2=$2;";
        let datos = [this.id_usuario, this.respuesta_2];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async cambiarClave() {
        let sql = "UPDATE tusuario SET clave=$1 WHERE id_usuario=$2;";
        let datos = [this.clave, this.id_usuario];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
}
exports.default = ModeloUsuario;
