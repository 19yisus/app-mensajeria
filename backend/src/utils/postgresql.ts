import { PoolClient } from "pg";
import PostgreSql from "../database/postgresql";
const POSTGRESQL = new PostgreSql()
const CLIENTE:Promise<PoolClient> =  POSTGRESQL.conectar()

export {
    POSTGRESQL,
    CLIENTE
}