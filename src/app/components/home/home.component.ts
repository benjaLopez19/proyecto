import { Component, OnInit } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import {Producto} from '../../interfaces/producto';
import {ApiService} from '../../services/api/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productos:Array<Producto>=[];
  constructor(private servicio:ApiService) { }

  ngOnInit(): void {
    this.servicio.getProductos().subscribe(datos=>{
      this.productos = datos;
      console.log(this.productos);
    });
  }

  productoSeleccionado(id:number){
    console.log(id);
    this.servicio.producto = id;
  }
  
  

}
