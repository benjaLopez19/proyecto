import { Injectable } from '@angular/core';
import { Session } from './session/session';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorageService;
  sessionStorageService;
  constructor(){
    this.localStorageService=localStorage;
    this.sessionStorageService = sessionStorage;
  }

  rawDatos:string ="";
  datos = {
    token:"",
    admin:2
  };

  cargarDatos(token:string,admin:number){
    console.log("cargar datos");
    let datos = {
      token:`${token}`,
      admin:admin
    }
    console.log(datos);
    this.localStorageService.setItem('sesion', JSON.stringify(datos));
    this.datos = datos;
  }

  borrarDatos(){
    console.log('borrar datos');
    this.localStorageService.removeItem('sesion');
    this.datos = {
      token:'',
      admin:2
    }
  }

  getDatos(){
    if(localStorage.getItem("sesion")!=null){
      this.rawDatos = localStorage.getItem('sesion')!;
      this.datos = JSON.parse(this.rawDatos);
    }else{
      console.log("no hay datos");
    }
  }

  //--------------SESION STORAGE-----------------------

  cargarDatosSession(token:string, admin:number){
    console.log("SESSION STORAGE");
      let datos ={
        token:`${token}`,
        admin:admin
      }
      this.sessionStorageService.setItem('sesion',JSON.stringify(datos));
      this.datos=datos;
  }

  borrarDatosSession(){
    this.sessionStorageService.removeItem('sesion');
    this.datos={
      token:'',
      admin:2
    }
  }

}
