import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  url="http://localhost:4000/";
  producto:number=0;

  header:number=0;

  getProductos():Observable<any>{
    console.log("entra al servicio");
    return this.http.get(`${this.url}getProductos`);    
  }

  createUsuario(
    nombre:string,
    apellido:string,
    rut:string,
    direccion:string,
    contrasenia:string,
    email:string,
    region:string,
    comuna:string):Observable<any>{

    //FORMATO DEL REQ.BODY Y FORMA DEL METODO POST
    const body = new HttpParams()
      .set("nombre",nombre)
      .set('apellido',apellido)
      .set("rut",rut)
      .set("direccion",direccion)
      .set("clave",contrasenia)
      .set("email",email)
      .set("region",region)
      .set("comuna",comuna);

    return this.http.post(`${this.url}crearUsuario`,body.toString(),{headers:new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
  }

}
