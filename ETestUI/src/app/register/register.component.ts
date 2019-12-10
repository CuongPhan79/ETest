import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    role: 'user'
  };

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  register(name, email, password) {
    this.credentials.name = name;
    this.credentials.email = email;
    this.credentials.password = password;
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
