import { PoolClient } from "pg"
import PostgreSql from "../database/postgresql"
import personaInterface from "../interfaces/types/models/persona"

class ModeloPersona implements personaInterface {

    id_persona:number
    nick_name:string
    nombre:string
    apellido:string
    postgresql:PostgreSql
    cliente:PoolClient

    constructor(postgresql_:PostgreSql,cliente_:PoolClient,persona?:personaInterface){
        if(persona!==undefined){
            this.id_persona=persona.id_persona
            this.nick_name=persona.nick_name
            this.nombre=persona.nombre
            this.apellido=persona.nombre
        }
        else{
            this.id_persona=0
            this.nick_name=""
            this.nombre=""
            this.apellido=""
        }
        this.postgresql=postgresql_
        this.cliente=cliente_
    }

    async registrar(){
    }

    async consultar(){

    }

    async consultarTodo(){

    }

    async actualizar() {

    }

    async eliminar(){

    }

}

export default ModeloPersona