import { PoolClient, QueryResult } from "pg"
import PostgreSql from "../database/postgresql"
import personaInterface from "../interfaces/types/models/persona"

class ModeloPersona implements personaInterface {

    id_persona:string
    nick_name:string
    nombre:string
    apellido:string
    estado_persona:string
    postgresql:PostgreSql
    cliente:PoolClient

    constructor(postgresql_:PostgreSql,cliente_:PoolClient){
        this.id_persona=""
        this.nick_name=""
        this.nombre=""
        this.apellido=""
        this.estado_persona=""
        this.postgresql=postgresql_
        this.cliente=cliente_
    }

    set setIdPersona(id:string){
        this.id_persona=id
    }

    set setNickName(nick_name_:string){
        this.nick_name=nick_name_
    }

    get getIdPersona():string{
        return this.id_persona
    }

    set setDatos(persona:personaInterface){
        this.id_persona=persona.id_persona
        this.nick_name=persona.nick_name
        this.nombre=persona.nombre
        this.apellido=persona.apellido
    }

    async registrar():Promise<QueryResult>{
        let sql:string = "INSERT INTO tpersona(nick_name,nombre,apellido,estado_persona) VALUES ($1,$2,$3,$4);"
        let datos:string[]=[this.nick_name,this.nombre,this.apellido,'1']
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarPorId(){
        let sql:string = "SELECT * FROM tpersona WHERE id_persona=$1"
        let datos:string[]=[this.id_persona]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarPorNickName(){
        // let sql:string = "SELECT * FROM tpersona WHERE nick_name=$1"
        let sql:string = "SELECT * FROM tpersona WHERE nick_name LIKE $1;"
        let datos:string[]=["%"+this.nick_name+"%"]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarTodo(){
        let sql:string = "SELECT * FROM tpersona"
        return await this.postgresql.query(this.cliente,sql)
    }

    async actualizar() {
        let sql:string = "UPDATE tpersona SET nick_name=$1,nombre=$2,apellido=$3 WHERE id_persona=$4 RETURNING id_persona;"
        let datos:string[]=[this.nick_name,this.nombre,this.apellido,this.id_persona]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async activarPersona() {
        let sql:string = "UPDATE tpersona SET estado_persona=$1 WHERE id_persona=$2 RETURNING id_persona;"
        let datos:string[]=['1',this.id_persona]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async desactivarPersona() {
        let sql:string = "UPDATE tpersona SET estado_persona=$1 WHERE id_persona=$2 RETURNING id_persona;"
        let datos:string[]=['0',this.id_persona]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async eliminar(){
        let sql:string = "DELETE FROM tpersona WHERE id_persona=$1"
        let datos:string[]=[this.id_persona]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

}

export default ModeloPersona