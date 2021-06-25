import { Component, OnInit,EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators,FormControl,FormsModule} from '@angular/forms';
import {ApiService} from "../../services/api/api.service";
import { StorageService } from 'src/app/services/storage/storage.service';



@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  //error del email
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  clave = new FormControl('',Validators.required);
  hide=true;
  siteKey:string='6LeI31EbAAAAACqTc_Nndi2lsNpDy9SzFDQebmKp';
  IniciarSesionForm:FormGroup;
  constructor(public fb: FormBuilder, private apiSerivce:ApiService, private storage:StorageService) {
    this.IniciarSesionForm = this.fb.group({
      recaptcha: ['', Validators.required]
    });
   }

  ngOnInit(): void {
   
  }

  IniciarSesion(){
    let email = this.emailFormControl.value;
    let claveAux = this.clave.value; 
    this.apiSerivce.incioSesion(email,claveAux).subscribe(datos=>{
      console.log(datos["token"]+" "+datos["admin"]);
      this.storage.cargarDatos(datos["token"],datos["admin"]);
    });
    
  }
}
