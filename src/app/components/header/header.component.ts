import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  search = new FormControl('');

  constructor(public fb:FormBuilder) { 
  }

  ngOnInit(): void {
  }

  searchProduct(){
    console.log(this.search.value);
  }
}
