import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoTestComponent} from './video-test/video-test.component';
import {HomeComponent} from './home/home.component';
import {VideosComponent} from './videos/videos.component';


const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
  },
  {
    path: 'video-test',
    component: VideoTestComponent,
  },
  {
    path: 'videos/:id',
    component: VideosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
