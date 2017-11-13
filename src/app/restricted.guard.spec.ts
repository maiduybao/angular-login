import { TestBed, async, inject } from '@angular/core/testing';

import { RestrictedGuard } from './restricted.guard';
import {UserService} from './user.service';
import { Router } from '@angular/router';

class UserServiceStub {
  isAuthenticated() { return true; }
  isAuthorized(permissions) { return true; }
}

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('RestrictedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RestrictedGuard,
        { provide: UserService, useClass: UserServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    });
  });

  it('should ...', inject([RestrictedGuard], (guard: RestrictedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
