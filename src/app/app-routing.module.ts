import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './services/auth/auth.guard';

const Routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: AuthentificationComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}