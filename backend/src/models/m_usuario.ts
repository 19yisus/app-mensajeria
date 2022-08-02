import { PoolClient, QueryResult } from 'pg';
import PostgreSql from '../database/postgresql';
import usuario from '../interfaces/types/models/usuario'

// metodos a agregar 

class ModeloUsuario  implements usuario {

    id_usuario:string
    id_persona:string
    correo:string
    telefono:string
    clave:string
    pregunta_1:string
    pregunta_2:string
    respuesta_1:string
    respuesta_2:string
    estado_usuario:string
    postgresql:PostgreSql
    cliente:PoolClient

    constructor(postgresql_:PostgreSql,cliente_:PoolClient){
        this.id_usuario=""
        this.id_persona=""
        this.correo=""
        this.telefono=""
        this.clave=""
        this.pregunta_1=""
        this.pregunta_2=""
        this.respuesta_1=""
        this.respuesta_2=""
        this.estado_usuario=""
        this.postgresql=postgresql_
        this.cliente=cliente_
    }

    set setDatos(usuario:any){
        this.id_usuario=usuario.id_usuario
        this.id_persona=usuario.id_persona
        this.correo=usuario.correo
        this.telefono=usuario.telefono
        this.clave=usuario.clave
        this.pregunta_1=usuario.pregunta_1
        this.pregunta_2=usuario.pregunta_2
        this.respuesta_1=usuario.respuesta_1
        this.respuesta_2=usuario.respuesta_2
        this.estado_usuario=usuario.estado_usuario
    }

    set setIdUsuario(id:string){
        this.id_usuario=id
    }

    set setIdPersona(id:string){
        this.id_persona=id
    }

    set setTelefono(telefono_:string){
        this.telefono=telefono_
    }

    set setCorreo(correo_:string){
        this.correo=correo_
    }

    get getCorreo():string{
        return this.correo
    }

    set setRespuesta1(respuesta_1_:string){
        this.respuesta_1=respuesta_1_
    }

    set setRespuesta2(respuesta_2_:string){
        this.respuesta_2=respuesta_2_
    }

    set setClave(clave_:string){
        this.clave=clave_
    }

    async registrar():Promise<QueryResult>{
        let sql:string = `INSERT INTO tusuario(
            id_persona,
            correo,
            telefono,
            clave,
            pregunta_1,
            pregunta_2,
            respuesta_1,
            respuesta_2,
            estado_usuario
            ) 
            VALUES(
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9
            ) RETURNING id_usuario;`
        let datos:string[] = [this.id_persona,this.correo,this.telefono,this.clave,this.pregunta_1,this.pregunta_2,this.respuesta_1,this.respuesta_2,'1']
        return await this.postgresql.query(this.cliente,sql,datos);
    }

    async consultarIdUsuario():Promise<QueryResult>{
        let sql:string= `SELECT tpersona.id_persona,tpersona.nick_name,
        tpersona.nombre,
        tpersona.apellido,
        tusuario.id_usuario,
        tusuario.correo 
        FROM 
        tusuario,
        tpersona 
        WHERE 
        tpersona.id_persona=tusuario.id_persona AND 
        tusuario.id_usuario=$1;`
        let datos :string[] = [this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarIdPersona():Promise<QueryResult>{
        let sql:string= `SELECT 
        tpersona.id_persona,
        tpersona.nick_name,
        tpersona.nombre,
        tpersona.apellido,
        tusuario.id_usuario,
        tusuario.correo 
        FROM 
        tusuario,
        tpersona 
        WHERE 
        tpersona.id_persona=tusuario.id_persona AND 
        tusuario.id_persona=$1;`
        let datos :string[] = [this.id_persona]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarPorCorreoPeroSinClave():Promise<QueryResult>{
        let sql:string= `SELECT 
        tpersona.id_persona,
        tpersona.nick_name,
        tpersona.nombre,
        tpersona.apellido,
        tusuario.id_usuario,
        tusuario.correo 
        FROM 
        tusuario,
        tpersona 
        WHERE 
        tpersona.id_persona=tusuario.id_persona AND 
        tusuario.correo=$1;
        `
        let datos :string[] = [this.correo]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarPorCorreoPeroConClave():Promise<QueryResult>{
        let sql:string= `SELECT 
        tpersona.id_persona,
        tpersona.nick_name,
        tpersona.nombre,
        tpersona.apellido,
        tusuario.id_usuario,
        tusuario.correo,
        tusuario.clave
        FROM 
        tusuario,
        tpersona 
        WHERE 
        tpersona.id_persona=tusuario.id_persona AND 
        tusuario.correo=$1;
        `
        let datos :string[] = [this.correo]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async consultarTodo():Promise<QueryResult>{
    
        let sql:string= `SELECT 
        tpersona.id_persona,
        tpersona.nick_name,
        tpersona.nombre,
        tpersona.apellido,
        tusuario.id_usuario,
        tusuario.correo 
        FROM 
        tusuario,
        tpersona 
        WHERE 
        tpersona.id_persona=tusuario.id_persona;`
        let datos :string[] = []
        return await this.postgresql.query(this.cliente,
            sql,datos)
    }

    async actualizarCorreo():Promise<QueryResult>{
        let sql :string = "UPDATE tusuario SET correo=$1 WHERE id_usuario=$2;"
        let datos :string[] = [this.correo,this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async actualizarTelefono():Promise<QueryResult>{
        let sql :string = "UPDATE tusuario SET telefono=$1 WHERE id_usuario=$2;"
        let datos :string[] = [this.telefono,this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async actualizarPregunta1():Promise<QueryResult>{
        let sql :string = "UPDATE tusuario SET pregunta_1=$1 WHERE id_usuario=$2;"
        let datos :string[] = [this.pregunta_1,this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async actualizarPregunta2():Promise<QueryResult>{
        let sql :string = "UPDATE tusuario SET pregunta_2=$1 WHERE id_usuario=$2;"
        let datos :string[] = [this.pregunta_2,this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async actualizarRespuesta1():Promise<QueryResult>{
        let sql :string = "UPDATE tusuario SET respuesta_1=$1 WHERE id_usuario=$2;"
        let datos :string[] = [this.respuesta_1,this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async actualizarRespuesta2():Promise<QueryResult>{
        let sql :string = "UPDATE tusuario SET respuesta_2=$1 WHERE id_usuario=$2;"
        let datos :string[] = [this.respuesta_2,this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async activarUsuario():Promise<QueryResult>{
        let sql :string = "UPDATE tusuario SET estado_usuario=$1 WHERE id_usuario=$2;"
        let datos :string[] = ['1',this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async desactivarUsuario():Promise<QueryResult>{
        let sql :string = "UPDATE tusuario SET estado_usuario=$1 WHERE id_usuario=$2;"
        let datos :string[] = ['0',this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async compararRespuesta1():Promise<QueryResult>{
        let sql: string = "SELECT * FROM tusuario WHERE id_usuario=$1 AND respuesta_1=$2;"
        let datos: string[] = [this.id_usuario,this.respuesta_1]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async compararRespuesta2():Promise<QueryResult>{
        let sql: string = "SELECT * FROM tusuario WHERE id_usuario=$1 AND respuesta_2=$2;"
        let datos: string[] = [this.id_usuario,this.respuesta_2]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

    async cambiarClave():Promise<QueryResult>{
        let sql: string = "UPDATE tusuario SET clave=$1 WHERE id_usuario=$2;"
        let datos: string[] = [this.clave,this.id_usuario]
        return await this.postgresql.query(this.cliente,sql,datos)
    }

}

export default ModeloUsuario