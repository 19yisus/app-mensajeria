"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
let { DB_HOST, DB_PORT, DB_NAME_PRO, DB_NAME_DEV, DB_NAME_TEST, DB_USER, DB_PASS, NODE_ENV } = process.env;
let DB = (NODE_ENV === "dev") ? DB_NAME_DEV : (NODE_ENV === "test") ? DB_NAME_TEST : DB_NAME_PRO;
class PostgreSql {
    host;
    port;
    db_name;
    user;
    pass;
    config;
    pool;
    constructor() {
        this.host = (DB_HOST) ? DB_HOST : "";
        this.port = (DB_PORT) ? DB_PORT : "";
        this.db_name = (DB) ? DB : "";
        this.user = (DB_USER) ? DB_USER : "";
        this.pass = (DB_PASS) ? DB_PASS : "";
        this.config = {
            host: this.host,
            port: this.port,
            database: this.db_name,
            user: this.user,
            password: this.pass
        };
        this.pool = new pg_1.Pool(this.config);
    }
    set setHost(host_) {
        this.host = host_;
    }
    set setPort(port_) {
        this.port = port_;
    }
    set setDBame(db_name_) {
        this.db_name = db_name_;
    }
    set setUser(user_) {
        this.user = user_;
    }
    set setPass(pass_) {
        this.pass = pass_;
    }
    get getHost() {
        return this.host;
    }
    get getPort() {
        return this.port;
    }
    get getDBame() {
        return this.db_name;
    }
    get getUser() {
        return this.user;
    }
    get getPass() {
        return this.pass;
    }
    async conectar() {
        let cliente = await this.pool.connect();
        return cliente;
    }
    async query(cliente, SQL, datos) {
        if (datos) {
            let result = await cliente.query(SQL, datos);
            return result;
        }
        else {
            let result = await cliente.query(SQL);
            return result;
        }
    }
    async cerrarConexion(cliente) {
        cliente.release();
        this.pool.end();
    }
}
exports.default = PostgreSql;
