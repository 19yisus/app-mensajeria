
import { PoolClient, QueryResult } from "pg"
import PostgreSql from "../database/postgresql"
import cuartoInterfaz from "../interfaces/types/models/cuarto"

class ModeloCuarto implements cuartoInterfaz{


    id_cuarto:string
    nombre_cuarto: string
    estado_cuarto:string
    postgresql:PostgreSql
    cliente:PoolClient

    constructor(postgresql_:PostgreSql,cliente_:PoolClient){
        this.id_cuarto=""
        this.nombre_cuarto=""
        this.estado_cuarto=""
        this.postgresql=postgresql_
        this.cliente=cliente_
    }

    set setDatos(cuarto:any){
        this.id_cuarto=cuarto.id_cuarto
        this.nombre_cuarto=cuarto.nombre_cuarto
        this.estado_cuarto=cuarto.estado_cuarto
    }

    set setIdCuarto(id:string){
        this.id_cuarto=id
    }

    set setNombreCuarto(nombre:string){
        this.nombre_cuarto=nombre
    }

    set setEstadoCuarto(estado_:string){
        this.estado_cuarto=estado_
    }

    async crearCuarto(){
        let sql: string = `INSERT INTO tcuarto(
            nombre_cuarto,
            estado_cuarto
        ) 
        VALUES(
            $1,
            $2
        ) RETURNING id_cuarto;`
        let datos:string[]=["privado","1"]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarCuartoId(){
        let sql: string = `SELECT * FROM tcuarto WHERE id_cuarto=$1`
        let datos:string[]=[this.id_cuarto]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

}

export default ModeloCuarto