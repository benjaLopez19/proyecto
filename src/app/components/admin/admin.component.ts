import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';

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

  constructor(private service:ApiService, private storage:StorageService) { }
  pedidos:any;
  //usuarios:any;
  ngOnInit(): void {
    let token = this.storage.datos.token;
    console.log(token);

    this.service.getPedidos(token).subscribe(datos=>{
      console.log(datos);
      this.pedidos = datos;
      console.log(this.pedidos[0].idProductos);
      let aux = this.pedidos[0].idProductos;
      console.log(JSON.parse(aux));
      let aux2= JSON.parse(aux);
      console.log(aux2[0].id);
    
    });

    this.service.getUsuarios(token).subscribe(datos=>{
      console.log(datos);
    });
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
