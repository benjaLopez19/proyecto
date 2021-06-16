import express, { request, Request, Response, Router } from "express";
import productoController from "./producto.controller";
import {Producto} from "../models/producto.model";

const router: Router = express.Router();

router.get('/all', (req:Request,res:Response)=>{
    let prod = productoController.getAllProductos();
    console.log(prod);
    res.send(prod);
});

router.get('/:id', (req: Request, res:Response)=>{
    const id: string = req.params['id'];
    let foundProd = productoController.findProdById(id);

    res.send(foundProd);
});

/*router.get('/all', (req: Request, res: Response) => {
  //let tasks = taskController.getAllTask()
  
  //res.send(tasks);
});

router.get('/:id', (req: Request, res: Response) => {
  const id: string = req.params['id'];
  //let foundTask = taskController.getTaskById(id);

  //res.send(foundTask);
})
*/
export default router;

