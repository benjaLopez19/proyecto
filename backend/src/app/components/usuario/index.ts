import express, { Express } from "express";
import usuarioRouter from "./usuario.network"
const usuario: Express = express();
usuario.use('/usuario', usuarioRouter);

export default usuario;