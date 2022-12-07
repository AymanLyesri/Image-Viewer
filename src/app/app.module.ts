import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

import { ParallaxDirective } from './directives/parallax/parallax.directive';
import { HiddenElementDirective } from './directives/hidden-element/hidden-element.directive';
import { ImageRatioDirective } from './directives/image-ratio/image-ratio.directive';
import { CursorDirective } from './directives/cursor/cursor.directive';
import { NavScrollDirective } from './directives/nav-scroll/nav-scroll.directive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { DonationComponent } from './donation/donation.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UploadComponent,
    AuthentificationComponent,
    HomeComponent,
    NavComponent,
    ParallaxDirective,
    HiddenElementDirective,
    ImageRatioDirective,
    CursorDirective,
    NavScrollDirective,
    SpinnerComponent,
    DonationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    AppRoutingModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
