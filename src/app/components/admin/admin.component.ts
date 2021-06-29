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
  auxR:any;
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


      let auxR:any = [{
        idPedido:Number,
        idProductos:[{
          id:Number,
          cantidad:Number 
        }]
      }];


      for(let i=0;i<this.pedidos.length;i++){
        console.log(i);
        aux = this.pedidos[i];
        console.log(aux);
        aux2 = JSON.parse(aux["idProductos"]);
        console.log(aux2);

        aux3 = {
          idPedido:aux.idPedido,
          idProductos:aux2
        };

        auxR.push(aux3);

        console.log(aux3);
      }

      console.log(auxR);
      this.auxR=auxR;
      this.auxR.splice(0,1)
      console.log(this.auxR);
      //sacando informacion del arreglo que llega
    });

    this.service.getUsuarios(token).subscribe(datos=>{
      //console.log(datos);
      this.usuarios=datos;
      this.dataSource = this.usuarios;
    });
  }
  

 //columnas de las tablas
  displayedColumns1: string[] = ['email', 'nombre', 'apellido','RUT'];
  displayedColumns2: string[] = ['id','cantidad'];
  //array de los objetos
  
  

}
