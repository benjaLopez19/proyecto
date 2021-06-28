import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  url="http://localhost:4000/";

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

  incioSesion(email:string,clave:string):Observable<any>{
    const body = new HttpParams()
      .set("email",email)
      .set("clave",clave);

    return this.http.post(`${this.url}inicioSesion`,body.toString(),{headers:new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
  }

  getUsuarios(token:string):Observable<any>{
    let headers = new HttpHeaders();
    headers= headers.append('access-token',token);

    return this.http.get(`${this.url}getUsuarios`,{'headers':headers});
  }

  getPedidos(token:string):Observable<any>{

    let headers = new HttpHeaders();
    headers= headers.append('access-token',token);

    return this.http.get(`${this.url}getPedidos`,{'headers':headers});
  }

  getProductosCategoria(categoria:string):Observable<any>{
    //console.log(categoria);
    console.log(`${this.url}getProductosByCategoria/${categoria}`);
    return this.http.get(`${this.url}getProductosByCategoria/${categoria}`);
  }

  getComentarios(idProducto:number):Observable<any>{
    return this.http.get(`${this.url}getComentariosByProduct/${idProducto}`);
  }

  createComentario(idProducto:number, comentario:string, calificacion:number, email:string, token:string, nombreUsuario:string):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('access-token',token);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const bodyComentario = new HttpParams()
      .set("usuarioKey",email)
      .set("productoKey",idProducto.toString())
      .set("comentario",comentario)
      .set('nombreUsuario',nombreUsuario);

    
    
    return this.http.post(`${this.url}crearComentario`,bodyComentario , {'headers':headers});
  }

  createCalificacion(calificacion:number, idProducto:number, email:string, token:string):Observable<any>{

    let headers = new HttpHeaders();
    headers = headers.append('access-token',token);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const bodyCalificacion = new HttpParams()
      .set("idProducto",idProducto.toString())
      .set("calificacion", calificacion.toString())
      .set("idUsuario",email);

    
    return this.http.post(`${this.url}crearCalificacion`,bodyCalificacion,{'headers':headers});

  }

  getCalificacion(id:number):Observable<any>{
    return this.http.get(`${this.url}getCalificacionById/${id}`);
  }

  getNombreUsuario(email:string):Observable<any>{
    return this.http.get(`${this.url}getUsuario/${email}`);
  }


}
