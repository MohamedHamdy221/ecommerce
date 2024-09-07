import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/deteils/deteils.component';
import { ForgotpassowrdComponent } from './components/forgotpassowrd/forgotpassowrd.component';


export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],
        children:[
            {path:'',redirectTo:'login',pathMatch:'full'},
            {path:'login',component:LoginComponent},
            {path:'register',component:RegisterComponent},
            {path:'forgot',component:ForgotpassowrdComponent}
    ]},

    {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path:'home',component:HomeComponent ,},
            {path:'product',component:ProductComponent},
            {path:'cart',component:CartComponent},
            {path:'brands',component:BrandsComponent},
            {path:'categories',component:CategoriesComponent},
            {path:'details/:id',component:DetailsComponent},
        ]},

    {path:'**',component:NotfoundComponent}
];
