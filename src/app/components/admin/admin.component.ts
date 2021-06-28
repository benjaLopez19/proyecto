import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';

export interface Usuario {
  email: string;
  nombre: string;
  apellido: string;
  rut: string;
}

export interface Producto{
  id:string;
  cantidad:string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private service:ApiService, private storage:StorageService, private router:Router) { }
  pedidos:any;
  usuarios:any;
  dataSource:any;
  dataSource2:any;
  ngOnInit(): void {
    let token = this.storage.datos.token;
    if(token.length==0)
      this.router.navigate(['/home']);


    this.service.getPedidos(token).subscribe(datos=>{
      this.pedidos = datos; //Arreglo de pedidos, cada pedido tiene su id y un arreglo con un producto y su cantidad
      console.log(this.pedidos);
      let aux:any;
      let aux2:any = [];
      let aux3:any =[];
      //sacando informacion del arreglo que llega
      for(let i=0;i<this.pedidos.length;i++){
         aux = this.pedidos[i].idProductos;
          aux2[0][i] = JSON.parse(aux);
          aux2[1][i] = this.pedidos[i].idPedido;
      }
      
      console.log(aux2);
    
      //desmantelando el array de objetos para guardar todo en un mismo arreglo
      let k=0;
      for(let i=0;i<aux2.length;i++){
        for(let j=0;j<aux2[i].length;j++){
          aux3[k]=aux2[i][j];
          k++;
        }
      }
    
      this.pedidos = aux3;
      this.dataSource2 = this.pedidos;

    });

    this.service.getUsuarios(token).subscribe(datos=>{
      console.log(datos);
      this.usuarios=datos;
      this.dataSource = this.usuarios;
    });
  }
  

 //columnas de las tablas
  displayedColumns1: string[] = ['email', 'nombre', 'apellido','RUT'];
  displayedColumns2: string[] = ['id','cantidad'];
  //array de los objetos
  
  

}
