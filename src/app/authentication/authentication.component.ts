import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      password: ['' /** default value */, [Validators.required]],
    });
    this.autoLogin();
  }

  autoLogin() {
    let userData: { name: string; password: string } = JSON.parse(
      localStorage.getItem('userData')
    );
    if (!userData) {
      console.log('no userdata');
      return;
    }
    let user: User = { name: userData.name, password: userData.password };
    this.authenticationService.login(user.name, user.password);
  }

  get name() {
    return this.form.get('name');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    console.log('in client ', this.form.value);
    this.authenticationService.login(
      this.form.value.name,
      this.form.value.password
    );
  }

  getResponse() {
    return this.authenticationService.isLoggedIn();
  }

  getLink() {
    return environment.HELPURL;
  }
  getIcon() {
    return "background-image:url('" + environment.HELPICON + "')";
  }
}
