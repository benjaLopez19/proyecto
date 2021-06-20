import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';

=======
import {FormGroup,FormBuilder, Validators, AbstractControl} from '@angular/forms';
>>>>>>> 6faa3781ba2356c0d6f46082f6252629ae9c2d19
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
