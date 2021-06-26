import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  url="http://localhost:4000/";
  producto:number=0;

  getProductos():Observable<any>{
    console.log("entra al servicio");
    return this.http.get(`${this.url}getProductos`);    
  }

  createProducto(
    nombre:string,
    apellido:string,
    rut:string,
    direccion:string,
    contrasenia:string,
    email:string):Observable<any>{

    const body = {};
    return this.http.post(`${this.url}crearProducto`,body);
  }

}
