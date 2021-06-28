import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuario } from 'src/app/interfaces/prueba';
import { SearchService } from 'src/app/services/search/search.service';
import { Producto } from 'src/app/interfaces/producto';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/interfaces/carrito';
import { AbstractControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Comentario } from 'src/app/interfaces/comentario';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProductoComponent implements OnInit {

  form_comentario:FormGroup;
  comentario:AbstractControl;
  calificacion:AbstractControl;

  id:number;
  nombre:string="";

  constructor(private fb:FormBuilder, private service:SearchService, private carritoService:CarritoService, private storageService:StorageService, private apiService:ApiService) { 
    /*Constructor del formulario al inicializarse el componente.*/
    this.form_comentario=this.fb.group({
      calificacion:['',[Validators.required]],
      comentario:['',[Validators.required]]
    })
    this.comentario = this.form_comentario.controls["comentario"];
    this.id=service.idBusqueda;
    this.calificacion = this.form_comentario.controls["calificacion"];
  }
  usuario = this.storageService.datos["email"];
  public isCollapsed = true; //esto es del colapse del comentario

  comentarioEntrantes:Array<Comentario> = [];
  producto:Array<Producto>=[];
  calificacionEntrante:number = 0;
  bool=false;
  sesion = false;

  ngOnInit(): void {
    this.service.getBusquedaById().subscribe(datos=>{
      this.producto = datos;
      console.log(this.producto);
      if(this.producto[0].stock<1){
        this.bool = true;
      }
    });

    this.apiService.getNombreUsuario(this.usuario).subscribe(datos=>{
      this.nombre = datos[0]["nombre"]+" "+datos[0]["apellido"];
    });
    
    this.apiService.getComentarios(this.id).subscribe(datos=>{
      this.comentarioEntrantes = datos;
      console.log(this.comentarioEntrantes);
    });

    this.apiService.getCalificacion(this.id).subscribe(datos=>{
      console.log(datos);
      this.calificacionEntrante = datos["calificacion"];
    });
  }

  carrito(){
    let aux:Carrito = {
      idProducto:this.producto[0].id,
      nombre:this.producto[0].nombre,
      precio:this.producto[0].precio,
      cantidad:1,
      stock:this.producto[0].stock
    }
    let auxStockSearch = this.producto[0].id;
    console.log(auxStockSearch);
    if(this.carritoService.revisarStock(auxStockSearch)){
      this.carritoService.productoAlCarrito(aux);
    }
  }

  enviarComentario(){
    console.log(this.calificacion.value);
    console.log(this.form_comentario.get("comentario")?.value);
    console.log("abstract control:"+this.comentario.value);
    console.log(this.usuario);
    let token = this.storageService.datos["token"];
    if(this.usuario.length == 0){
      console.log("se necesita usuario");
      this.sesion = true;
    }else{
      console.log('se envian los resultados');
      //(idProducto:number, comentario:string, calificacion:number, email:string, token:string, nombreUsuario:string

      if(this.calificacion.value && this.comentario.value){
        console.log("primer if");
        this.apiService.createCalificacion(this.calificacion.value, this.id, this.usuario, token).subscribe(datos=>{
          console.log(datos);
        });

        this.apiService.createComentario(this.id, this.comentario.value, this.calificacion.value, this.usuario, token, this.nombre).subscribe(datos=>{
          console.log(datos);
        });
      }else if(this.calificacion.value){
        console.log("segundo if");
        this.apiService.createCalificacion(this.calificacion.value, this.id, this.usuario, token).subscribe(datos=>{
          console.log(datos);
        });
      }else if(this.comentario.value){
        console.log("tercer if");
        this.apiService.createComentario(this.id, this.comentario.value, this.calificacion.value, this.usuario, token, this.nombre).subscribe(datos=>{
          console.log(datos);
        });
      }

    }
    
  }

}
