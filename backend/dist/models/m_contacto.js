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
    set setDatos(datos) {
        this.id_contacto = datos.id_contacto;
        this.id_usuario = datos.id_usuario;
        this.id_cuarto = datos.id_cuarto;
        this.contacto_id_usuario = datos.contacto_id_usuario;
        this.estado_contacto = datos.estado_contacto;
    }
    set setIdUsuario(id) {
        this.id_usuario = id;
    }
    set setIdCuarto(id) {
        this.id_cuarto = id;
    }
    async crearContacto() {
        let sql = `INSERT INTO tcontacto(
            id_usuario,
            id_cuarto,
            contacto_id_usuario,
            estado_contacto
        )
        VALUES(
            $1,
            $2,
            $3,
            $4
        )
        `;
        let id_usuario_ = this.id_usuario;
        let id_cuarto_ = this.id_cuarto;
        let contacto_id_usuario_ = this.contacto_id_usuario;
        let datos = [id_usuario_, id_cuarto_, contacto_id_usuario_, "1"];
        return this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarContactos() {
        let sql = `SELECT * FROM 
        tpersona,
        tusuario,
        tcontacto 
        WHERE 
        tcontacto.id_usuario=$1 AND
        tusuario.id_usuario=tcontacto.contacto_id_usuario AND
        tpersona.id_persona=tusuario.id_persona
        `;
        let id_usuario_ = this.id_usuario;
        let datos = [id_usuario_];
        return this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarPorIdUsuarioYIdCuarto() {
        // SELECT * FROM tcontacto WHERE id_usuario=1 AND id_cuarto=3;
        let sql = `SELECT * FROM 
        tcontacto 
        WHERE 
        id_usuario=$1 AND 
        id_cuarto=$2
        `;
        let id_usuario_ = this.id_usuario;
        let id_cuarto_ = this.id_cuarto;
        let datos = [id_usuario_, id_cuarto_];
        return this.postgresql.query(this.cliente, sql, datos);
    }
}
exports.default = ModeloContacto;
