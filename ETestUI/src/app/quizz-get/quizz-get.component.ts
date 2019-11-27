import { Component, OnInit } from '@angular/core';
import Quizz from '../quizz';
import { QuizzService } from '../quizz.service';
@Component({
  selector: 'app-quizz-get',
  templateUrl: './quizz-get.component.html',
  styleUrls: ['./quizz-get.component.css']
})
export class QuizzGetComponent implements OnInit {
  quizzs: Quizz[];
  constructor(private ps: QuizzService) { }

  deleteQuizz(id) {
    this.ps.deleteQuizz(id).subscribe(res => {
      this.quizzs.splice(id, 1);
    });
  }
  ngOnInit() {
    this.ps
    .getQuizzs()
    .subscribe((data: Quizz[]) => {
      this.quizzs = data;
    });
  }

}
