import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CarritoComponent} from './components/carrito/carrito.component'
import {FormularioComponent} from './components/formulario/formulario.component'
const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'carrito', component:CarritoComponent},
  {path:'formulario', component:FormularioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
