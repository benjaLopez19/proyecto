import { Injectable } from '@angular/core';
import { Carrito } from 'src/app/interfaces/carrito';
import { Detalle } from 'src/app/interfaces/detalle';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http:HttpClient) { }
  productosCarrito:Array<Carrito> = [];
  url="http://localhost:4000/";

  productoAlCarrito(producto:Carrito){
    let id = producto.idProducto;
    for(let i=0;i<this.productosCarrito.length;i++){
      if(this.productosCarrito[i].idProducto==id){
        this.productosCarrito[i].cantidad++;
        return;
      }
    }
    this.productosCarrito.push(producto);
  }

  sustraer(id:number){
    for(let i = 0;i<this.productosCarrito.length;i++){
      if(this.productosCarrito[i].idProducto == id){
        if(this.productosCarrito[i].cantidad>1)
          this.productosCarrito[i].cantidad--;
      }
    }
  }

  sumar(id:number){
    for(let i = 0;i<this.productosCarrito.length;i++){
      if(this.productosCarrito[i].idProducto == id){
          this.productosCarrito[i].cantidad++;
      }
    }
  }

  quitar(id:number){
    for(let i = 0;i<this.productosCarrito.length;i++){
      if(this.productosCarrito[i].idProducto == id){
          this.productosCarrito.splice(i,1);
      }
    }
  }

  comprar(compra:Array<Carrito>,email:string,token:string):Observable<any>{

    let headers = new HttpHeaders();
    headers= headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers= headers.append('access-token',token);

    let detallePedido:Array<Detalle> = [];
    for(let i=0; i<compra.length;i++){
      let aux:Detalle = {
        id:compra[i].idProducto,
        cantidad:compra[i].cantidad
      }
      detallePedido.push(aux);
    }
    const body = new HttpParams()
      .set("usuario",email)
      .set("productos",JSON.stringify(detallePedido));
    
    return this.http.post(`${this.url}generarPedido`,body,{'headers':headers});
  }
}
