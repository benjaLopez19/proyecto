import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {SearchService} from '../../services/search/search.service'
import {Producto} from '../../interfaces/producto';
import {ApiService} from '../../services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /*variable de inicio de sesion para el ngIF */
  /*0=iniciar sesion, registrarse; 1=cerrar sesion; 2=iniciar sesion admin*/
  search = new FormControl('');
  productos:Producto|undefined;
  aux =0;

  constructor(private router:Router, private servicio:SearchService, private api:ApiService, public storage:StorageService) { 
  } 
  
  ngOnInit(): void {
    console.log('ngOnInit');
    this.storage.getDatos();
  }

  searchProduct(){
    this.servicio.valorString(this.search.value);
  }

  cerrarSesion(){
    this.storage.borrarDatos();
  }

  admin(){
    console.log("El admin cuando");
    
  }


}
