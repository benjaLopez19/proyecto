import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {SearchService} from '../../services/search/search.service'
import {Producto} from '../../interfaces/producto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  search = new FormControl('');
  productos:Producto|undefined;

  constructor(private router:Router, private servicio:SearchService) { 
  }

  ngOnInit(): void {
    
  }

  searchProduct(){
    this.servicio.valor(this.search.value);
    this.servicio.getBusqueda().subscribe(datos=>{
      this.productos = datos;
      console.log(datos);
    });
  }
}
