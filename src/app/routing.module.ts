import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './notfound/notfound.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RestrictedGuard } from './restricted.guard';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [RestrictedGuard],
    data: {authorize: ['Client', 'Admin']}
  },
  { path: '403', component: ForbiddenComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
