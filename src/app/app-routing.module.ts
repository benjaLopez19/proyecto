import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CarritoComponent} from './components/carrito/carrito.component'
import {FormularioComponent} from './components/formulario/formulario.component'
import {SearchComponent} from './components/search/search.component'
import {InterComponent} from './components/inter/inter.component'
import {ProductoComponent} from "./components/producto/producto.component"


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'carrito', component:CarritoComponent},
  {path:'formulario', component:FormularioComponent},
  {path:'search',component:SearchComponent},
  {path:'inter',component:InterComponent},
  {path:"producto", component:ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
