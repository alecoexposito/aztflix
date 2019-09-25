import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoTestComponent } from './video-test/video-test.component';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';
import { ShowCarouselComponent } from './show-carousel/show-carousel.component';
import {HttpClientModule} from '@angular/common/http';
import { AztflixNavbarComponent } from './aztflix-navbar/aztflix-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoTestComponent,
    HomeComponent,
    VideosComponent,
    ShowCarouselComponent,
    AztflixNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
