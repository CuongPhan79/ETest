import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  uri = 'http://localhost:8000/quizz';
  constructor(private http: HttpClient) {
  }
   addQuizz(code, question, optionA, optionB, optionC, optionD, answer) {
    const obj = {
      code, question, optionA, optionB, optionC, optionD, answer
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
  updateQuizz(code, question, optionA, optionB, optionC, optionD, answer, id) {
    const obj = {
      code,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      id
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
