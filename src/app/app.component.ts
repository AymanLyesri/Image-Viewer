import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  constructor(public authentificationservice: AuthentificationService) {}

  getTitle() {
    return environment.NAME;
  }
}
