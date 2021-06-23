import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/prueba';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})

export class ProductoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
