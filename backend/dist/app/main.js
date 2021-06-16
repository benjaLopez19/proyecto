"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const components_1 = __importDefault(require("./components"));
let mysql = require('mysql');
function saludoHandler(req, res) {
    console.log(req.baseUrl);
    res.send({ mensaje: "hola" });
}
;
function main() {
    const server = express_1.default();
    const port = 4000;
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '',
        database: 'tienda'
    });
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use(cors_1.default());
    server.use('/api', ...components_1.default);
    server.use('/saludo', saludoHandler);
    server.listen(port, () => {
        console.log('server listening on: http:localhost:' + port);
    });
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
}
exports.default = { main };
