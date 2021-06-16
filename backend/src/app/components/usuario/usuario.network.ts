import express, {Express, Request, Response, Router} from "express";

const router: Router = express.Router();

router.get("/hola",(req:Request,res:Response)=>{
    console.log('hola');
});

export default router;