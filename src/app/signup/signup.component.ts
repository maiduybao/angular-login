import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

const logger = console;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  signup = {
    email: null,
    password: null,
    confirmPassword: null,
    firstName: null,
    lastName: null
  };
  signupForm: FormGroup;
  signupError: string;
  passwordMatched = true;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(this.signup.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]),
      password: new FormControl(this.signup.password, [
        Validators.required,
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$'),
        Validators.minLength(6)
      ]),
      firstName: new FormControl(this.signup.firstName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl(this.signup.lastName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      confirmPassword: new FormControl(this.signup.confirmPassword, [
        Validators.required,
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$'),
        Validators.minLength(6),
      ]),
    });
  }

  private isPasswordMatch(password: string, confirmpassword: string): boolean {
    return password === confirmpassword;
  }

  registerSubmit(event) {
    event.preventDefault();
    this.passwordMatched = this.isPasswordMatch(this.signup.password, this.signup.confirmPassword);
    if (this.passwordMatched) {
      this.userService.register(this.signup)
        .then((result) => {
          logger.log('Register Result', JSON.stringify(result));
          if (result.success) {
            this.signupError = null;
            logger.log('Register Success');
            this.router.navigateByUrl('/login');
          } else {
            this.signupError = result.message;
            logger.log('Register Failed');
          }
        })
        .catch((error) => {
          logger.log('Register Failed', JSON.stringify(error));
        });
    }
  }

}
