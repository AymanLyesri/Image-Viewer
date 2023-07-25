import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

import { HiddenElementDirective } from './directives/hidden-element/hidden-element.directive';
import { ImageRatioDirective } from './directives/image-ratio/image-ratio.directive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { DonationComponent } from './donation/donation.component';
import { FooterComponent } from './footer/footer.component';
import { ParallaxImageDirective } from './directives/parallax-image/parallax-image.directive';
import { OptionsComponent } from './options/options.component';
import { SauceComponent } from './sauce/sauce.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { StatisticsComponent } from './statistics/statistics.component';
import { OptionComponent } from './options/option/option.component';
import { PostComponent } from './posts/post/post.component';
import { NavOptionsComponent } from './nav/nav-options/nav-options.component';
import { ImageGridDirective } from './directives/image-grid/image-grid.directive';
import { StatisticComponent } from './statistics/statistic/statistic/statistic.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UploadComponent,
    AuthenticationComponent,
    HomeComponent,
    NavComponent,
    HiddenElementDirective,
    SpinnerComponent,
    DonationComponent,
    FooterComponent,
    ParallaxImageDirective,
    OptionsComponent,
    SauceComponent,
    StatisticsComponent,
    ImageGridDirective,
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
    NgxFileDropModule,
    OptionComponent,
    PostComponent,
    NavOptionsComponent,
    StatisticComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
