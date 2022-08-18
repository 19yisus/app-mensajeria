import { PoolClient, QueryResult } from 'pg';
import PostgreSql from '../database/postgresql';
import contacto from '../interfaces/types/models/contacto';
// metodos a agregar 

class ModeloContacto  implements contacto {

    id_contacto:string
    id_usuario:string
    id_cuarto:string
    contacto_id_usuario:string
    estado_contacto:string
    postgresql:PostgreSql
    cliente:PoolClient

    constructor(postgresql_:PostgreSql,cliente_:PoolClient){
        this.id_contacto=""
        this.id_usuario=""
        this.id_cuarto=""
        this.contacto_id_usuario=""
        this.estado_contacto=""
        this.postgresql=postgresql_
        this.cliente=cliente_
    }

    set setDatos(datos:any){
        this.id_contacto=datos.id_contacto
        this.id_usuario=datos.id_usuario
        this.id_cuarto=datos.id_cuarto
        this.contacto_id_usuario=datos.contacto_id_usuario
        this.estado_contacto=datos.estado_contacto
    }

    set setIdUsuario(id:string){
        this.id_usuario=id
    }

    async crearContacto():Promise<QueryResult>{
        let sql: string = `INSERT INTO tcontacto(
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
        `
        let id_usuario_=this.id_usuario as unknown as number
        let id_cuarto_=this.id_cuarto as unknown as number
        let contacto_id_usuario_=this.contacto_id_usuario as unknown as number
        let datos: [number,number,number,string]= [id_usuario_,id_cuarto_,contacto_id_usuario_,"1"]
        return this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarContactos(){
        let sql: string = `SELECT * FROM 
        tpersona,
        tusuario,
        tcontacto 
        WHERE 
        tcontacto.id_usuario=$1 AND
        tusuario.id_usuario=tcontacto.id_usuario AND
        tpersona.id_persona=tusuario.id_persona
        `
        let id_usuario_=this.id_usuario as unknown as number
        let id_cuarto_=this.id_cuarto as unknown as number
        let contacto_id_usuario_=this.contacto_id_usuario as unknown as number
        let datos: string[]= [this.id_usuario]
        return this.postgresql.query(this.cliente,sql,datos)
    }

}

export default ModeloContacto