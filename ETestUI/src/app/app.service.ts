import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('jwt')
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = "http://localhost:8000";

  constructor(private http : HttpClient) {
  }

  postRequest(route,itemjson){
    return this.http.post(this.baseUrl+route,itemjson,httpOptions);
  }

  putRequest(route,itemjson){
    return this.http.put(this.baseUrl+route,itemjson,httpOptions);
  }

  deleteRequest(route,itemjson){
    return this.http.delete(this.baseUrl+route,itemjson);
  }

  getRequest(route){
    return this.http.get(this.baseUrl+route,httpOptions);
  }

}
