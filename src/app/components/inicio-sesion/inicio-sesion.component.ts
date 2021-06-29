import { Component, OnInit,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators,FormControl,FormsModule} from '@angular/forms';
import {ApiService} from "../../services/api/api.service";
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  //VALIDATORS
  //error del email
  sesion = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  clave = new FormControl('',Validators.required);

  /****************/
  completo:boolean=false; //completo es tu variable blu 
  hide=true;

  IniciarSesionForm:FormGroup;
  constructor(public fb: FormBuilder, private apiSerivce:ApiService, private storage:StorageService, private router:Router) {
    this.IniciarSesionForm = this.fb.group({
      recaptcha: ['', Validators.required]
    });
   }
  
  ngOnInit(): void {
   
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  IniciarSesion(){
    if(grecaptcha.getResponse() != ""){
      let email = this.emailFormControl.value;
      let claveAux = this.clave.value; 
      this.apiSerivce.incioSesion(email,claveAux).subscribe(datos=>{
        console.log(datos);
        console.log(datos["token"]+" "+datos["admin"]);
        if(this.completo){
          this.storage.cargarDatos(datos["token"],email,datos["admin"]);
          this.router.navigate(['/home']);
          return;
        }else{
          this.storage.cargarDatosSession(datos["token"],email,datos["admin"]);
          this.router.navigate(['/home']);
        }
        
      });
      this.sesion = true;
   
    }
    else{
      alert('no se ha completado el captcha');
    }
  }
}
