import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzAddComponent } from './quizz-add/quizz-add.component';
import { QuizzEditComponent } from './quizz-edit/quizz-edit.component';
import { QuizzGetComponent } from './quizz-get/quizz-get.component';

const routes: Routes = [
  {
    path: 'quizz/create',
    component: QuizzAddComponent
  },
  {
    path: 'edit/:id',
    component: QuizzEditComponent
  },
  {
    path: 'quizz/list',
    component: QuizzGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }