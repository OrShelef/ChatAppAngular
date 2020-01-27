import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './Home/Home.component';


const routes: Routes = [
{path:'' ,pathMatch:'full',redirectTo:'/login'},
{path:'login',component:LoginComponent,data: {animation: 'Login'}},
{path:'home',component:HomeComponent,data: {animation: 'Home'}},
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [
      RouterModule
   ],
   declarations: [
    
   ]
})
export class AppRoutingModule { }
