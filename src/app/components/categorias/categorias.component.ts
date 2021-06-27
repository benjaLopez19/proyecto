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

  Datos:Array<Producto> = [{
    "id" : 1,
    "stock": 6,
    "calificacion": 4.4,
    "nombre": "Poop 1",
    "descripcion":"really good hat",
    "categoria": "scout",
    "precio": 5.99
  },
  {
    "id": 2,
    "stock": 6,
    "calificacion": 4.5,
    "nombre": "Poop 2",
    "descripcion": "really good hat",
    "categoria": "soldier",
    "precio": 5.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  },
  {
    "id": 3,
    "stock": 5,
    "calificacion": 4.4,
    "nombre": "Poop 3",
    "descripcion": "really good hat",
    "categoria": "pyro",
    "precio": 6.99
  }

];

  public isCollapsed = true;

}
