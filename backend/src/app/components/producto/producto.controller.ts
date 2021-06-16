import {Producto} from "../models/producto.model"

let hardProductos: Producto[] = [
    {_id:"0",nombre:"ghastly gibus", descripcion:"Gorro feo", stock:5, calificacion: 11, categoria:"hat"},
    {_id:"1",nombre:"bloody banker", descripcion:"terno", stock:10, calificacion: 7, categoria:"cosmetic"},
    {_id:"2",nombre:"starboard crusader", descripcion:"jojo reference", stock:1, calificacion: 20, categoria:"hat"}
];

function getAllProductos(){
    return hardProductos;
}

function findProdById(id:string){
    let foundProd;

    for (let i = 0; i < hardProductos.length; i++) {
        if( hardProductos[i]._id === id ){
          foundProd = hardProductos[i];
        }
    }

    return foundProd;
}

export default{
    getAllProductos, findProdById
};