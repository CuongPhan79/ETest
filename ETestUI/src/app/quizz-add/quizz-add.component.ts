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
      content: ['', Validators.required ],
      answersA: ['', Validators.required ],
      answersB: ['', Validators.required ],
      answersC: ['', Validators.required ],
      answersD: ['', Validators.required ],
      level: [''],
    });
  }
  checklevel(level) {
    level == level
  }
  addQuizz(code, content, level, answersA, answersB, answersC, answersD) {
    this.ps.addQuizz(code, content, level, answersA, answersB, answersC, answersD);
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }

}
