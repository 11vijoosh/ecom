import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'', redirectTo: '/products', pathMatch:'full'},
  {path:'products', component:ProductsComponent},
  {path:'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path:'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
