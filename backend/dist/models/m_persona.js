"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModeloPersona {
    id_persona;
    nick_name;
    nombre;
    apellido;
    estado_persona;
    postgresql;
    cliente;
    constructor(postgresql_, cliente_) {
        this.id_persona = "";
        this.nick_name = "";
        this.nombre = "";
        this.apellido = "";
        this.estado_persona = "";
        this.postgresql = postgresql_;
        this.cliente = cliente_;
    }
    set setIdPersona(id) {
        this.id_persona = id;
    }
    set setNickName(nick_name_) {
        this.nick_name = nick_name_;
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
    async registrar() {
        let sql = "INSERT INTO tpersona(nick_name,nombre,apellido,estado_persona) VALUES ($1,$2,$3,$4);";
        let datos = [this.nick_name, this.nombre, this.apellido, '1'];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarPorId() {
        let sql = "SELECT * FROM tpersona WHERE id_persona=$1";
        let datos = [this.id_persona];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarPorNickName() {
        // let sql:string = "SELECT * FROM tpersona WHERE nick_name=$1"
        let sql = "SELECT * FROM tpersona WHERE nick_name LIKE $1;";
        let datos = ["%" + this.nick_name + "%"];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarTodo() {
        let sql = "SELECT * FROM tpersona";
        return await this.postgresql.query(this.cliente, sql);
    }
    async actualizar() {
        let sql = "UPDATE tpersona SET nick_name=$1,nombre=$2,apellido=$3 WHERE id_persona=$4 RETURNING id_persona;";
        let datos = [this.nick_name, this.nombre, this.apellido, this.id_persona];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async activarPersona() {
        let sql = "UPDATE tpersona SET estado_persona=$1 WHERE id_persona=$2 RETURNING id_persona;";
        let datos = ['1', this.id_persona];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async desactivarPersona() {
        let sql = "UPDATE tpersona SET estado_persona=$1 WHERE id_persona=$2 RETURNING id_persona;";
        let datos = ['0', this.id_persona];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async eliminar() {
        let sql = "DELETE FROM tpersona WHERE id_persona=$1";
        let datos = [this.id_persona];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
}
exports.default = ModeloPersona;
