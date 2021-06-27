import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/prueba';
import { SearchService } from 'src/app/services/search/search.service';
import { Producto } from 'src/app/interfaces/producto';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/interfaces/carrito';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})

export class ProductoComponent implements OnInit {

  constructor(private service:SearchService, private carritoService:CarritoService) { }
  producto:Array<Producto>=[];
  bool=false;
  ngOnInit(): void {
    this.service.getBusquedaById().subscribe(datos=>{
      this.producto = datos;
      console.log(this.producto);
      if(this.producto[0].stock<0){
        this.bool = true;
      }
    });
    
  }

  usuarios:Array<Usuario> =[{
    "nombre":"goober",
    "calificacion":5,
    "comentario":"muy buen objeto mi loco"
  },
  {
    "nombre":"weegum",
    "calificacion": 5,
    "comentario": "Completamente excelente"
  },
  { 
    "nombre":"blucillo", 
    "calificacion": 5,
    "comentario": "Would recomend"
  }
  ]

  public isCollapsed = true;

  carrito(){
    let aux:Carrito = {
      idProducto:this.producto[0].id,
      nombre:this.producto[0].nombre,
      precio:this.producto[0].precio,
      cantidad:1
    }
    this.carritoService.productoAlCarrito(aux);
  }

}
