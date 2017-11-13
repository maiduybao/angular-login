import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UserService } from './user.service';
import { RestrictedGuard } from './restricted.guard';
import { AppRoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    ForbiddenComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, RestrictedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
