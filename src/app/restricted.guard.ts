import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {UserService} from './user.service';

@Injectable()
export class RestrictedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.userService.isAuthenticated()) {
        if (this.userService.isAuthorized(next.data.authorize)) {
          return true;
        } else {
          this.router.navigateByUrl('/403');
        }
      } else {
        this.router.navigateByUrl('/login');
      }
      return false;
  }
}
