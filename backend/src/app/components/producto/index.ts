import express, { Express } from "express";
import productoRouter from "./producto.network";

const producto: Express = express();
producto.use('/producto', productoRouter);

export default producto;