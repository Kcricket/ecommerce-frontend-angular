import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guard/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  {component:LoginComponent,path:'login'},
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'profile', component: ProfileComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'forbidden', component: ForbiddenComponent },

  {component:RegisterComponent,path:'register'},
  { path: '', component: HomeComponent },

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
