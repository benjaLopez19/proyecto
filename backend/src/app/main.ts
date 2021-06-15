import express, { Express, Request, Response } from "express";
function saludoHandler(req: Request, res:Response){
    console.log(req.baseUrl);
    res.send({mensaje: "hola" });
};

function main(){
    const server: Express = express();
    const port:number = 4000;

    server.use('/saludo', saludoHandler);

    server.listen(port, ()=>{
        console.log('server listening on: http:localhost:' + port);
    });
}

export default{main};