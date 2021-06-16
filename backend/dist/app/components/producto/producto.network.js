"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_controller_1 = __importDefault(require("./producto.controller"));
const router = express_1.default.Router();
router.get('/all', (req, res) => {
    let prod = producto_controller_1.default.getAllProductos();
    console.log(prod);
    res.send(prod);
});
router.get('/:id', (req, res) => {
    const id = req.params['id'];
    let foundProd = producto_controller_1.default.findProdById(id);
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
exports.default = router;
