import { Component, OnInit } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';
import {Producto} from '../../interfaces/producto';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productos:Array<Producto>=[];
  constructor(private servicio:SearchService, private router:Router) { }

  ngOnInit(): void {
    this.servicio.getProductos().subscribe(datos=>{
      this.productos = datos;
      console.log(this.productos);
      console.log("entra aqui 001");
    });
  }

  productoSeleccionado(id:number){
    console.log(id);
    this.servicio.idBusqueda = id;
    this.router.navigate(['/producto']);
  }

  categoriaSeleccionada(categoria:string){
    console.log(categoria);
    console.log(this.servicio.stringCategoria);
    this.servicio.stringCategoria = categoria;
  }
  
  

}
