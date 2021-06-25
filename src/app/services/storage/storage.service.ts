import { Injectable } from '@angular/core';
import { Session } from './session/session';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorageService;
  constructor(){
    this.localStorageService=localStorage;
  }

  cargarDatos(token:string,admin:number){
    console.log("cargar datos");
    let datos = {
      token:`${token}`,
      admin:`${admin}`
    }
    console.log(datos);
    this.localStorageService.setItem('sesion', JSON.stringify(datos));
  }

  /*
  borrarDatos(){
    console.log('borrar datos');
    this.localStorageService.removeItem('wea');
  }

  getDatos(){
    let dato = localStorage.getItem('wea');
    console.log(dato);
  }*/



}
