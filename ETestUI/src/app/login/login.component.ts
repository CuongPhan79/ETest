import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['profile']);
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }
  user: SocialUser;
  loggedIn: boolean;
  credentials: TokenPayload = {
    email: '',
    password: '',
    role: ''
  };
  angForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
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
