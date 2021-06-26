import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  elementos:String[]=['gorro1','gorro2','gorro3'];
  constructor() { }

  ngOnInit(): void {
  }
}
