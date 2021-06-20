import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators, AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  busqueda:FormGroup;
  auxiliar:AbstractControl;

  constructor(public fb:FormBuilder) { 
    this.busqueda=this.fb.group(
      {barra:['',[Validators.required]] }
    );
    this.auxiliar = this.busqueda.controls['search'];
  }

  ngOnInit(): void {
  }

  buscar(){
    let b1=this.busqueda.get('search')?.value;
    console.log(b1);
  }
}
