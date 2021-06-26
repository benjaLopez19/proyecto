import { Component, OnInit } from '@angular/core';

export interface Usuario {
  email: string;
  nombre: string;
  apellido: string;
  rut: string;
}

export interface Producto{
  id:string;
  nombre:string;
  cantidad:string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  usuarios: Usuario[] = [
    { "email": "asda@gmail.com", "nombre": "John", "apellido": "Doe", "rut": "17.543.432-1" }
  ];

  productos: Producto[] = [
    {"id":"1","nombre":"Ghastly Gibus", "cantidad":"1"}
  ];

 //columnas de las tablas
  displayedColumns1: string[] = ['email', 'nombre', 'apellido', 'rut'];
  displayedColumns2: string[] = ['id','nombre','cantidad'];
  //array de los objetos
  dataSource = this.usuarios;
  dataSource2 = this.productos;


}
