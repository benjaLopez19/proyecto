import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor(private service:ApiService, private router:Router, private searchService:SearchService) { }
  productos:Array<Producto> = [];
  busqueda= true;

  ngOnInit(): void {
    this.filtrarCategorias(this.searchService.stringCategoria);
  }

  showAll(){
    this.filtrarCategorias("default");
  }

  filtrarCategorias(value:string){
    if(value==="default"){
      this.searchService.getProductos().subscribe(datos=>{
        this.busqueda=true;
        this.productos=datos;
      });
    }else{
      this.service.getProductosCategoria(value).subscribe(datos=>{
        if(datos["message"]){
          this.busqueda =false;
        }else{
          this.busqueda =true;
          this.productos = datos;
        }
      });
    }
  }

  productoSeleccionado(id:number){
    console.log(id);
    this.searchService.idBusqueda = id;
    this.router.navigate(['/producto']);
  }

  public isCollapsed = true;

}
