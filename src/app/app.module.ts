import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';

import {ReactiveFormsModule} from "@angular/forms"
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
import {ToastrModule} from "ngx-toastr";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';


import { ForbiddenComponent } from './forbidden/forbidden.component'
import { AuthGuard } from './guard/auth.guard';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './guard/auth.interceptor';
import { CartComponent } from './cart/cart.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    ProfileComponent,
    AdminComponent,
    ForbiddenComponent,
    CartComponent,
    ProductPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
