import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../service/authentication.service';
import {SignUpRequest} from '../model/sign.up.request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  loginError = false;
  errorMsg: string;
  modalOpened: boolean;
  signUpRequest: any;
  signUpSuccess: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentAccessTokenValue) {
      this.router.navigate(['/']);
    }
    this.signUpRequest = new SignUpRequest(null, null, null, null, null, null, null);
  }

  get controls() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.setBackgroundImage();
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_]+$/)]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_]+$/)]
      ]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  showError(msg: string) {
    this.errorMsg = msg;
    this.loginError = true;
    setTimeout(() => {
      this.loginError = false;
    }, 5000);
  }

  showSuccess(msg: string) {
    this.errorMsg = msg;
    this.signUpSuccess = true;
    setTimeout(() => {
      this.signUpSuccess = false;
    }, 5000);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {usernameOrEmail, password} = this.controls;
      this.authenticationService.login(usernameOrEmail.value, password.value)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigate(['/cards']);
          }, error => {
            this.showError('Invalid Username/Email or Password!');
          });
    } else {
      if (this.loginForm.controls.usernameOrEmail.invalid && (this.loginForm.controls.usernameOrEmail || this.loginForm.controls.usernameOrEmail)) {
        if (this.loginForm.controls.usernameOrEmail.errors.required) {
          this.showError('Username/Email is required!');
        }
        if (this.loginForm.controls.usernameOrEmail.errors.minlength) {
          this.showError('Username must be at least 3 characters long.');
        }
        if (this.loginForm.controls.usernameOrEmail.errors.pattern) {
          this.showError('Username does not match template!');
        }
      }
      if (this.loginForm.controls.password.invalid && (this.loginForm.controls.password || this.loginForm.controls.password)) {
        if (this.loginForm.controls.password.errors.required) {
          this.showError('Password is required!');
        }
        if (this.loginForm.controls.password.errors.required && this.loginForm.controls.usernameOrEmail.errors.required) {
          this.showError('Username/Email and Password is required!');
        }
        if (this.loginForm.controls.password.errors.minlength) {
          this.showError('Password must be at least 8 characters long.');
        }
        if (this.loginForm.controls.password.errors.pattern) {
          this.showError('Password does not match template!');
        }
      }
    }
  }

  registration() {
    this.openModal();
    this.authenticationService.registrate(this.signUpRequest).subscribe((apiResponse) => {
      if (apiResponse.success) {
        this.modalOpened = false;
        this.showSuccess('Success registration.');
      } else {
        this.modalOpened = false;
        this.showError('Registration failed. Please, repeat.');
      }
    }, (error) => {
      console.log(error);
      this.modalOpened = false;
      this.showError('Registration failed. Please, repeat.');
    });
  }

  openModal() {
    this.modalOpened = true;
    setTimeout(() => {
      debugger;
      const ele = document.getElementsByClassName('modal')[0];
      ele.classList.remove('modal');
      ele.setAttribute('style', `  position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 500;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2.4rem;`);
    }, 100);
  }

  setBackgroundImage() {
    setTimeout(() => {
      const ele = document.getElementsByClassName('login-wrapper')[0];
      ele.setAttribute('style',
        `display: flex;
    height: 100%;
    background-image: url("/assets/family.jpg");
    background-size: contain;
    background-position-x: right;
    background-repeat: no-repeat;`);
    }, 100);
  }
}
