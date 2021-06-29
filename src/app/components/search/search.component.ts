import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router'
import { SearchService } from '../../services/search/search.service';
import { Producto } from '../../interfaces/producto';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  stock = false;
  //formcontrol
  preciomax = new FormControl('',[]);
  preciomin = new FormControl('',[]);

  auxProductos:Array<Producto>=[];
  productos:Array<Producto>=[];
  
  constructor( private router:Router, private servicio:SearchService) { 
  
  }

  busqueda = true;
  ngOnInit(): void {
    this.servicio.getBusqueda().subscribe(datos=>{
      this.productos = datos;
      this.auxProductos = datos;
      console.log(this.productos);
      if(datos.message){
        this.busqueda = false;
        return;
      }
    });
  }

  productoSeleccionado(id:number){
    this.servicio.idBusqueda = id;
    this.router.navigate(['/producto']);
  }

  funcion(){
    this.productos = this.auxProductos;
    console.log(this.productos);
    if(this.preciomax.value){
      for(let i=0;i<this.productos.length;i++){
        console.log(this.productos[i].precio);
        if(this.productos[i].precio>this.preciomax.value){
          this.productos.splice(i,1);
          i--;
        }
      }
      console.log(this.productos)
    }

    if(this.preciomin.value){
      for(let i=0;i<this.productos.length;i++){
        if(this.productos[i].precio<this.preciomin.value){
          this.productos.splice(i,1);
          i--;
        }
      }
    }

    if(this.stock == true){
      for(let i=0;i<this.productos.length;i++){
        if(this.productos[i].stock==0){
          this.productos.splice(i,1);
          i--;
        }
      }
    }

  }
}
