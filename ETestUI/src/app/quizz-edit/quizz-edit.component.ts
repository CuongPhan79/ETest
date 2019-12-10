import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from '../quizz.service';
@Component({
  selector: 'app-quizz-edit',
  templateUrl: './quizz-edit.component.html',
  styleUrls: ['./quizz-edit.component.css']
})
export class QuizzEditComponent implements OnInit {

  angForm: FormGroup;
  quizz: any = {};
  constructor(private route: ActivatedRoute, private router: Router, private ps: QuizzService, private fb: FormBuilder) {
    this.createForm();
   }
  createForm() {
    this.angForm = this.fb.group({
      code: ['', Validators.required ],
      question: ['', Validators.required ],
      optionA: ['', Validators.required ],
      optionB: ['', Validators.required ],
      optionC: ['', Validators.required ],
      optionD: ['', Validators.required ],
      answer: ['', Validators.required ],
    });
  }
  updateQuizz(code, question, optionA, optionB, optionC, optionD, answer, id) {
    this.route.params.subscribe(params => {
      this.ps.updateQuizz(code, question, optionA, optionB, optionC, optionD, answer, params.id);
      this.router.navigate(['/']);
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.editQuizz(params['id']).subscribe(res => {
        this.quizz = res;
    });
  });
  }

}
