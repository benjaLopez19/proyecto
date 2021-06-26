import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router'
import { SearchService } from '../../services/search/search.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  productos:Array<Producto>=[];
  constructor(private servicio:SearchService) { 
  
  }

  busqueda = true;
  ngOnInit(): void {
    this.servicio.getBusqueda().subscribe(datos=>{
      this.productos = datos;
      console.log(this.productos);
      if(datos.message){
        this.busqueda = false;
        return;
      }
    });
  }

}
