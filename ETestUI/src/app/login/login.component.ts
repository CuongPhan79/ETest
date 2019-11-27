import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: '',
    role: ''
  };
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  login(email, password) {
    this.credentials.email = email;
    this.credentials.password = password;
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
  loginfb() {
    this.auth.loginfb(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
