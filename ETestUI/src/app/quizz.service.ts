import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  uri = 'http://localhost:8000/quizz';
  constructor(private http: HttpClient) {
  }
   addQuizz(code, content, level, answersA, answersB, answersC, answersD) {
    const obj = {
      code, content, level, answersA, answersB, answersC, answersD
    };
    console.log(obj);
    this.http.post(`${this.uri}/create`, obj)
        .subscribe(res => console.log('Done'));
  }
  getQuizzs() {
    return this
           .http
           .get(`${this.uri}`);
  }
  editQuizz(id) {
    return this
            .http
            .get(`${this.uri}/read/${id}`);
    }
  updateQuizz(code, content, level, answersA, answersB, answersC, answersD, id) {
    const obj = {
      code,
      content,
      level,
      answersA,
      answersB,
      answersC,
      answersD
    };
    this
      .http
      .put(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }
  deleteQuizz(id) {
    return this
      .http
      .patch(`${this.uri}/delete/${id}`,id);
  }
}
