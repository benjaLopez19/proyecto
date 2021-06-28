import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/interfaces/carrito';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  elementos:String[]=['gorro1','gorro2','gorro3'];
  constructor(public carritoService:CarritoService, private storage:StorageService) { }

  bool = false;
  sesion = false;
  compra = false;
  boton = true;

  productos:Array<Carrito>=[];
  idCompra:number = 0;
  ngOnInit(): void {
    this.productos = this.carritoService.productosCarrito;
    console.log(this.productos);
    if(this.productos.length == 0){
      this.bool = true;
      this.boton = false;
    }
  }

  sustraer(id:number){
    for(let i = 0;i<this.productos.length;i++){
      if(this.productos[i].idProducto == id){
        if(this.productos[i].cantidad>1){
          this.productos[i].cantidad-1;
          this.carritoService.sustraer(id);
        }
      }
    }
  }

  sumar(id:number){
    for(let i = 0;i<this.productos.length;i++){
      if(this.productos[i].idProducto == id){
          console.log(this.productos[i].stock);
          if(this.carritoService.revisarStock(id)){
            this.productos[i].cantidad+1;
            this.carritoService.sumar(id);
          }
        }
    }
  }

  quitar(id:number){
    for(let i=0 ; i<this.productos.length;i++){
      if(this.productos[i].idProducto==id){
        this.productos.splice(i,1);
        this.carritoService.quitar(id);
        if(this.productos.length==0){
          this.bool=true;
          this.boton=false;
        }
      }
    }
  }

  comprar(){
    let email = this.storage.datos.email;
    let token = this.storage.datos.token;

    if(email.length>0){
      this.carritoService.comprar(this.productos,email,token).subscribe(datos=>{
        console.log(datos);
        this.idCompra = datos["insertId"];
        this.compra=true;
        this.boton=false;
        this.productos = [];
        this.carritoService.productosCarrito = [];
      });
    }else{
      this.sesion=true;
    }
  }

}
