import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizzAddComponent } from './quizz-add/quizz-add.component';
import { QuizzGetComponent } from './quizz-get/quizz-get.component';
import { QuizzEditComponent } from './quizz-edit/quizz-edit.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { QuizzService } from './quizz.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AppService } from './app.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent }
];
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('404601530234646')
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('876488602025-5fv232fq7laavv8mhr8rse4merkmou6j.apps.googleusercontent.com')
  }
]);
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    QuizzAddComponent,
    QuizzGetComponent,
    QuizzEditComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [

    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    CountdownModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    QuizzService,
    AuthenticationService,
    AppService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
export function provideConfig() {
  return config;
}
