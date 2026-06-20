import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';

export const routes: Routes = [

  {
    path:'',
    component:HomeComponent
  },

  {
    path:'catalogo',
    component:CatalogoComponent
  },

  {
    path:'carrito',
    component:CarritoComponent
  },

  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'registro',
    component:RegisterComponent
  },

  {
    path:'recuperar',
    component:RecoverComponent
  }

];
