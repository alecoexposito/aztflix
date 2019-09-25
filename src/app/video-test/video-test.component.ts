import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
declare var jQuery: any;

@Component({
  selector: 'app-video-test',
  templateUrl: './video-test.component.html',
  styleUrls: ['./video-test.component.css']
})
export class VideoTestComponent implements OnInit {

  uploadsUrl: string = environment.uploadsUrl;
  constructor() { }

  ngOnInit() {
    const videoPlayer = jQuery('#video-id').Video({
      videos: [{
        videoType: 'HTML5',
        title: 'Capitulo 1',
        description: 'Bla bla bla',
        mp4SD: this.uploadsUrl + 'videos/888777744444.mp4',
        prerollAD: true,
        preroll_mp4: this.uploadsUrl + 'ads/9854787545.mp4',
        prerollSkipTimer: 5,
        thumbImg: this.uploadsUrl + 'shows/24234234.jpg'
      }],
      // playlist: "Off"
    });
  }

}
