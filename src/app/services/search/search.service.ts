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

  valor(string:string){
    this.stringBusqueda = string;
    //console.log("ESTO LLEGA AL SERVICIO: "+this.stringBusqueda);
  }

  getBusqueda():Observable<any>{
    //console.log(`${this.url}getProductosByNombre/${this.stringBusqueda}`);
    return this.http.get(`${this.url}getProductosByNombre/${this.stringBusqueda}`);
  }


}
