import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

const logger = console;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  credentials = {
    email: null,
    password: null
  };
  loginError: string;
  credentialForm: FormGroup;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.credentialForm = new FormGroup({
      email: new FormControl(this.credentials.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]),
      password: new FormControl(this.credentials.password, [
        Validators.required,
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$'),
        Validators.minLength(6)
      ])
    });
  }

  loginSubmit(event) {
    event.preventDefault();
    this.userService.login(this.credentials)
      .then((result) => {
        if (result.success) {
          this.credentials.password = null;
          this.loginError = null;
          this.router.navigateByUrl('/dashboard');
        } else {
          this.loginError = result.message;
        }
      });
  }
}
