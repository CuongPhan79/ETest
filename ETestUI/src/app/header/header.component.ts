import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(public auth: AuthenticationService) {}
}
