import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

class UserServiceStub {
  register(signup) {
    return true;
  }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ SignupComponent ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
