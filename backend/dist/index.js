"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servidor = exports.app = exports.io = void 0;
const app_1 = __importDefault(require("./app"));
exports.app = app_1.default;
const socket_io_1 = require("socket.io");
const postgresql_1 = require("./utils/postgresql");
const c_mensaje_1 = __importDefault(require("./controllers/c_mensaje"));
const token_1 = __importDefault(require("./utils/token"));
const servidor = app_1.default.listen(app_1.default.get("PORT"), () => {
    console.log("corriendo api en el puerto : " + app_1.default.get("PORT"));
});
exports.servidor = servidor;
let io = new socket_io_1.Server(servidor, {
    cors: {
        origin: "http://127.0.0.1:5500"
    }
});
exports.io = io;
let usuarios = 0;
io.on("connection", sokect => {
    usuarios = usuarios + 1;
    console.log("conectando");
    sokect.on("consultar-mensajes-chat", async (datosCliete) => {
        let token = token_1.default.validarToken(datosCliete.token);
        postgresql_1.CLIENTE.then(async (cliente) => {
            let datos = await c_mensaje_1.default.consultarMensajesSokect(postgresql_1.POSTGRESQL, cliente, token, datosCliete.id_cuarto);
            console.log(`enviado mensajes del chat ${datosCliete.id_cuarto} numeros total de mensajes ${datos.length}`);
            io.emit("obtener-mensajes-chat", datos);
        });
    });
    sokect.broadcast.emit("total-usuarios", usuarios);
    sokect.on("disconnect", () => {
        usuarios = usuarios - 1;
        console.log("desconectando del socket");
        sokect.broadcast.emit("total-usuarios", usuarios);
    });
});
