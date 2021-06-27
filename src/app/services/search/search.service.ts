import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http:HttpClient) {}

  url="http://localhost:4000/";
 
  stringBusqueda:string|undefined;
  idBusqueda:number = -1;

  valorString(string:string){
    this.stringBusqueda = string;
    //console.log("ESTO LLEGA AL SERVICIO: "+this.stringBusqueda);
  }

  getProductos():Observable<any>{
    console.log("entra al servicio");
    return this.http.get(`${this.url}getProductos`);    
  }

  getBusqueda():Observable<any>{
    //console.log(`${this.url}getProductosByNombre/${this.stringBusqueda}`);
    if(this.stringBusqueda===""){
      return this.http.get(`${this.url}getProductosByNombre/NoUnObjeto`);
    }
    return this.http.get(`${this.url}getProductosByNombre/${this.stringBusqueda}`);
  }

  getBusquedaById():Observable<any>{
    console.log(`${this.url}getProductosById/${this.idBusqueda}`);
    return this.http.get(`${this.url}getProductosById/${this.idBusqueda}`);
  }


}
