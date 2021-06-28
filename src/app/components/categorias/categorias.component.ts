import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor(private service:ApiService) { }
  productos:Array<Producto> = [];

  ngOnInit(): void {
    this.service.getProductosCategoria("hat").subscribe(datos=>{
      this.productos = datos;
      console.log("Productos:");
      console.log(this.productos);
  
    });
  }

  showAll(){

  }

  filtrarCategorias(value:any){
    this.service.getProductosCategoria(value).subscribe(datos=>{
      window.location.reload();
      this.productos = datos;
    });
  }

  public isCollapsed = true;

}
