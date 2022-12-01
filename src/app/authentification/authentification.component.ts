import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authentificationservice: AuthentificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      password: ['' /** default value */, [Validators.required]],
    });
  }

  get name() {
    return this.form.get('name');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    console.log('in client ', this.form.value);
    this.authentificationservice.login(
      this.form.value.name,
      this.form.value.password
    );
    this.form.reset();
  }

  getResponse() {
    return this.authentificationservice.isLoggedIn();
  }
}
