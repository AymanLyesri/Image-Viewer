import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit
{
  form: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void
  {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.autoLogin();
  }

  autoLogin()
  {
    let user: User = JSON.parse(
      localStorage.getItem('userData')
    );
    if (!user) {
      console.log('no userdata');
      return;
    }
    this.authenticationService.login(user.name, user.password).subscribe((loggedIn) =>
    {
      if (loggedIn) this.router.navigateByUrl('/upload')
    });
  }

  onSubmit()
  {
    console.log('in client ', this.form.value);
    this.authenticationService.login(
      this.form.value.name,
      this.form.value.password
    ).subscribe((loggedIn) =>
    {
      if (loggedIn) this.router.navigateByUrl('/upload')
      else window.alert("Ur trying to rob me huh :(")
    });
  }


  getLink()
  {
    return environment.HELPURL;
  }
  getIcon()
  {
    return "background-image:url('" + environment.HELPICON + "')";
  }
}
