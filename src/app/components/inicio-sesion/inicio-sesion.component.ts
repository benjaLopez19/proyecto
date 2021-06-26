import { Component, OnInit,EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators,FormControl,FormsModule} from '@angular/forms';



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
  hide=true;
  siteKey:string='6LeI31EbAAAAACqTc_Nndi2lsNpDy9SzFDQebmKp';
  IniciarSesionForm:FormGroup;
  constructor(public fb: FormBuilder) {
    this.IniciarSesionForm = this.fb.group({
      recaptcha: ['', Validators.required]
    });
   }

  ngOnInit(): void {
   
  }

  IniciarSesion(){
    console.log('1');
  }
}
