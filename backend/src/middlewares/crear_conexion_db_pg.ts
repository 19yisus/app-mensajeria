import { NextFunction, Request, Response } from "express";
import { PoolClient } from "pg";
import PostgreSql from "../database/postgresql";

let crearConexion = async (req:Request,res:Response,next:NextFunction) => {
    const POSTGRESQL = new PostgreSql()
    const CLIENTE:PoolClient = await POSTGRESQL.conectar()
    req.body["postgresql"] = POSTGRESQL
    req.body["cliente"] = CLIENTE
    next()
}


export default crearConexion