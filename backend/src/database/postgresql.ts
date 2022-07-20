import postgresql_conexion from "../interfaces/postgresql_conexion"
import {Pool, PoolClient, QueryResult} from "pg"
import dotEnv from "dotenv"
import path from "path"
dotEnv.config({ path: path.resolve(__dirname, '../.env') })

let {DB_HOST,DB_PORT,DB_NAME_PRO,DB_NAME_DEV,DB_NAME_TEST,DB_USER,DB_PASS,NODE_ENV} = process.env

let DB = (NODE_ENV==="dev")? DB_NAME_DEV:(NODE_ENV==="test")? DB_NAME_TEST:DB_NAME_PRO

class PostgreSql implements postgresql_conexion{

    host: string
    port: string
    db_name: string
    user: string
    pass: string
    config: Object
    pool: Pool

    constructor(){
        this.host=(DB_HOST)? DB_HOST as string: ""
        this.port=(DB_PORT)? DB_PORT as string: ""
        this.db_name=(DB)? DB as string: ""
        this.user=(DB_USER)? DB_USER as string: ""
        this.pass=(DB_PASS)? DB_PASS as string: ""
        this.config={
            host: this.host,
            port: this.port,
            database: this.db_name,
            user: this.user,
            password: this.pass
        }
        this.pool=new Pool(this.config)
    }

    set setHost(host_:string){
        this.host=host_
    }

    set setPort(port_:string){
        this.port=port_
    }

    set setDBame(db_name_:string){
        this.db_name=db_name_
    }

    set setUser(user_:string){
        this.user=user_
    }

    set setPass(pass_:string){
        this.pass=pass_
    }
    

    get getHost():string{
        return this.host
    }

    get getPort():string{
        return this.port
    }

    get getDBame():string{
        return this.db_name
    }

    get getUser():string{
        return this.user
    }

    get getPass():string{
        return this.pass
    }
    

    async conectar():Promise<PoolClient>{
        let cliente:PoolClient= await this.pool.connect()
        return cliente
    }

    async query(cliente:PoolClient,SQL:string,datos?:any[]):Promise<QueryResult>{
        if(datos){
            let result:QueryResult=await cliente.query(SQL,datos)
            return result
        }
        else{
            let result:QueryResult=await cliente.query(SQL)
            return result
        }
        

    }
    
    async cerrarConexion(cliente:PoolClient):Promise<void>{
        cliente.release()
        this.pool.end()
    }

}

export default PostgreSql