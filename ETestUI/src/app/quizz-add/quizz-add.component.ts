import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { QuizzService } from '../quizz.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-quizz-add',
  templateUrl: './quizz-add.component.html',
  styleUrls: ['./quizz-add.component.css']
})
export class QuizzAddComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,  private router: Router, private ps: QuizzService) {
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
  addQuizz(code, question, optionA, optionB, optionC, optionD, answer) {
    this.ps.addQuizz(code, question, optionA, optionB, optionC, optionD, answer);
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }

}
