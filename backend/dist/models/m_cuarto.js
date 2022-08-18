"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModeloCuarto {
    id_cuarto;
    nombre_cuarto;
    estado_cuarto;
    postgresql;
    cliente;
    constructor(postgresql_, cliente_) {
        this.id_cuarto = "";
        this.nombre_cuarto = "";
        this.estado_cuarto = "";
        this.postgresql = postgresql_;
        this.cliente = cliente_;
    }
    set setDatos(cuarto) {
        this.id_cuarto = cuarto.id_cuarto;
        this.nombre_cuarto = cuarto.nombre_cuarto;
        this.estado_cuarto = cuarto.estado_cuarto;
    }
    set setIdCuarto(id) {
        this.id_cuarto = id;
    }
    set setNombreCuarto(nombre) {
        this.nombre_cuarto = nombre;
    }
    set setEstadoCuarto(estado_) {
        this.estado_cuarto = estado_;
    }
    async crearCuarto() {
        let sql = `INSERT INTO tcuarto(
            nombre_cuarto,
            estado_cuarto
        ) 
        VALUES(
            $1,
            $2
        ) RETURNING id_cuarto;`;
        let datos = ["privado", "1"];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
    async consultarCuartoId() {
        let sql = `SELECT * FROM tcuarto WHERE id_cuarto=$1`;
        let datos = [this.id_cuarto];
        return await this.postgresql.query(this.cliente, sql, datos);
    }
}
exports.default = ModeloCuarto;
