import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  role: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
  uri = 'http://localhost:8000';
  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profilelocal'|'loginfb', user?: TokenPayload): Observable<any> {
    let base;
    
    if (method === 'post') {
      base = this.http.post(`${this.uri}/${type}`, user);
    } else {
      if(type === 'profilelocal'){
        var Authorization = this.getUserDetails();
        let id = Authorization._id
        base = this.http.get(`${this.uri}/${type}`, { headers: { Authorization: id }});
      }
      else{
        base = this.http.get(`${this.uri}/auth/google`);
      }
    }
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    console.log(request)
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    localStorage.setItem('token', this.token);
    return this.request('post', 'login', user);
  }
  public loginfb(user: TokenPayload): Observable<any> {
    localStorage.setItem('token', this.token);
    return this.request('get', 'loginfb', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profilelocal');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
