import moment from 'moment';
import { PoolClient, QueryResult } from 'pg';
import PostgreSql from '../database/postgresql';
import solicitud from '../interfaces/types/models/solicitud';

// metodos a agregar 

class ModeloSolicitud  implements solicitud {

    id_solicitud:string
    id_usuario_solicito:string
    id_solicita:string
    estado_solicitud:string
    fecha_solicitud:string
    postgresql:PostgreSql
    cliente:PoolClient

    constructor(postgresql_:PostgreSql,cliente_:PoolClient){
        this.id_solicitud=""
        this.id_usuario_solicito=""
        this.id_solicita=""
        this.estado_solicitud=""
        this.fecha_solicitud=""
        this.postgresql=postgresql_
        this.cliente=cliente_
    }

    set setDatos(solicitud:any){
        this.id_solicitud=solicitud.id_solicitud
        this.id_usuario_solicito=solicitud.id_usuario_solicito
        this.id_solicita=solicitud.id_solicita
        this.estado_solicitud=solicitud.estado_solicitud
        this.fecha_solicitud=solicitud.fecha_solicitud
    }


    set setIdSolicitud(id:string){
        this.id_solicitud=id
    }

    set setIdUsuario(id:string){
        // quien mando la solicitud
        this.id_usuario_solicito=id
    }

    set setIdSolicita(id:string){
        // a quien le mando la solicitud
        this.id_solicita=id
    }

    set setIdEstadoSolicitud(estado:string){
        // a quien le mando la solicitud
        this.estado_solicitud=estado
    }

    async registrar():Promise<QueryResult>{
        // estado solicitud 
        //  a -> acepto
        //  e -> en espera
        //  r -> rechazado
        let fecha:string=moment().format("YYYY-MM-DD")
        let sql:string = `INSERT INTO tsolicitud(
            id_usuario_solicito,
            id_solicita,
            estado_solicitud,
            fecha_solicitud
        )
        VALUES(
            $1,
            $2,
            $3,
            $4
        )
        RETURNING id_solicitud;
        `
        let datos:string[]=[this.id_usuario_solicito,this.id_solicita,"e",fecha]
        return await this.postgresql.query(this.cliente,sql,datos)
    }


    async consultarMisSolicitudesEspera():Promise<QueryResult>{
        let sql:string = `SELECT * FROM 
        tpersona,
        tusuario,
        tsolicitud 
        WHERE 
        tsolicitud.id_solicita=$1 AND 
        tsolicitud.estado_solicitud=$2 AND 
        tusuario.id_usuario=tsolicitud.id_usuario_solicito AND 
        tpersona.id_persona=tusuario.id_persona; `
        let id_solicita_numero:number=this.id_solicita as unknown as number
        let datos:[number, string]=[id_solicita_numero,"e"]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarSolicitud():Promise<QueryResult>{
        let sql:string = `SELECT * FROM 
        tsolicitud 
        WHERE 
        id_solicitud=$1`
        let datos:[string]=[this.id_solicitud]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarMisSolicitudes():Promise<QueryResult>{
        let sql:string = `SELECT * FROM 
        tpersona,
        tusuario,
        tsolicitud 
        WHERE 
        tsolicitud.id_usuario_solicito=$1 AND
        tusuario.id_usuario=tsolicitud.id_usuario_solicito AND 
        tpersona.id_persona=tusuario.id_persona; `
        let id_usuario_solicito:number=this.id_usuario_solicito as unknown as number
        let datos:[number]=[id_usuario_solicito]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async aceptarSolicitud():Promise<QueryResult>{
        let sql:string = `UPDATE tsolicitud SET
        estado_solicitud=$1
        WHERE 
        id_solicitud=$2 AND
        id_solicita=$3;
        `
        let datos:string[]=["a",this.id_solicitud,this.id_solicita]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async rechazarSolicitud():Promise<QueryResult>{
        let sql:string = `UPDATE tsolicitud SET
        estado_solicitud=$1
        WHERE 
        id_solicitud=$2 AND
        id_solicita=$3;
        `
        let datos:string[]=["r",this.id_solicitud,this.id_solicita]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarMisSolicitudesEnviadas():Promise<QueryResult>{
        let sql:string = `SELECT * FROM 
        tpersona,
        tusuario,
        tsolicitud 
        WHERE 
        tsolicitud.id_usuario_solicito=$1 AND
        tusuario.id_usuario=tsolicitud.id_solicita AND
        tpersona.id_persona=tusuario.id_persona;
        `
        let datos:string[]=[this.id_solicita,"e"]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async borrarSolicitudEnviada():Promise<QueryResult>{
        // DELETE FROM tsolicitud WHERE id_solicitud=4 AND id_usuario_solicito=1;
        let sql:string = `DELETE FROM tsolicitud WHERE id_solicitud=$1 AND id_usuario_solicito=$2;`
        let id_solicitud_:number = this.id_solicitud as unknown as number
        let id_usuario_solicito_:number = this.id_usuario_solicito as unknown as number
        let datos:number[]=[id_solicitud_,id_usuario_solicito_]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

}

export default ModeloSolicitud