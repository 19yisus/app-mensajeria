import { PoolClient, QueryResult } from 'pg';
import PostgreSql from '../database/postgresql';
import mensaje from '../interfaces/types/models/mensaje';
// metodos a agregar 

class ModeloMensaje implements mensaje{
    id_mensaje:string
    id_cuarto:string
    id_usuario:string
    mensaje:string
    fecha_mensaje:string
    hora_mensaje:string
    estado_mensaje:string
    postgresql:PostgreSql
    cliente:PoolClient

    constructor(postgresql_:PostgreSql,cliente_:PoolClient){
        this.id_mensaje=""
        this.id_cuarto=""
        this.id_usuario=""
        this.mensaje=""
        this.fecha_mensaje=""
        this.hora_mensaje=""
        this.estado_mensaje=""
        this.postgresql=postgresql_
        this.cliente=cliente_
    }

    set setDatos(datos:any){
        this.id_mensaje=datos.id_mensaje
        this.id_cuarto=datos.id_cuarto
        this.id_usuario=datos.id_usuario
        this.mensaje=datos.mensaje
        this.fecha_mensaje=datos.fecha_mensaje
        this.hora_mensaje=datos.hora_mensaje
        this.estado_mensaje=datos.estado_mensaje
    }

    set setIdCuarto(id:string){
        this.id_cuarto=id
    }

    set setIdUsuario(id:string){
        this.id_usuario=id
    }

    set setMensaje(msj:string){
        this.mensaje=msj
    }

    set setFecha(fecha:string){
        this.fecha_mensaje=fecha
    }

    set setHora(hora:string){
        this.hora_mensaje=hora
    }

    async crearMensaje():Promise<QueryResult>{
        let sql: string = `INSERT INTO tmensaje(
            id_cuarto,
            id_usuario,
            mensaje,
            fecha_mensaje,
            hora_mensaje,
            estado_mensaje
        )
        VALUES(
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        ) RETURNING id_mensaje`
        let id_cuarto_=this.id_cuarto as unknown as number
        let id_usuario_=this.id_usuario as unknown as number
        let datos:[number,number,string,string,string,string]= [id_cuarto_,id_usuario_,this.mensaje,this.fecha_mensaje,this.hora_mensaje,"1"]
        return this.postgresql.query(this.cliente,sql,datos)
    }


}

export default ModeloMensaje