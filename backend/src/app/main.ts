import express, { Express, Request, Response } from "express";
import cors from "cors";
import component from "./components";
let mysql = require('mysql');

function saludoHandler(req: Request, res:Response){
    console.log(req.baseUrl);
    res.send({mensaje: "hola" });
};

function main(){
    const server: Express = express();
    const port:number = 4000;

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root', 
        port     : 3306,
        password : '',
        database : 'tienda'
    });

    server.use(express.json());
    server.use(express.urlencoded({extended:true}));
    server.use(cors());
    server.use('/api', ...component);
    server.use('/saludo',saludoHandler);

    server.listen(port, ()=>{
        console.log('server listening on: http:localhost:' + port);
    });

    connection.connect(function(err:any){
        if(err){
            console.error('error connecting: '+ err.stack);
            return;
        }
        console.log('connected as id '+ connection.threadId);
    });
    
}

export default{main};
