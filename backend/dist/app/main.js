"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
function saludoHandler(req, res) {
    console.log(req.baseUrl);
    res.send({ mensaje: "hola" });
}
;
function main() {
    const server = express_1.default();
    const port = 4000;
    server.use('/saludo', saludoHandler);
    server.listen(port, () => {
        console.log('server listening on: http:localhost:' + port);
    });
}
exports.default = { main };
