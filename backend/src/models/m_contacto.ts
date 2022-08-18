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

}

export default ModeloContacto