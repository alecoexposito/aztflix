import { Component, OnInit } from '@angular/core';
import {AztflixService} from '../services/aztflix.service';

@Component({
  selector: 'app-aztflix-navbar',
  templateUrl: './aztflix-navbar.component.html',
  styleUrls: ['./aztflix-navbar.component.css']
})
export class AztflixNavbarComponent implements OnInit {

  channels: any = [];
  constructor(private service: AztflixService) { }

  ngOnInit() {
    this.service.getChannelsIdAndName().subscribe((data: any) => {
      this.channels = data.info;
    })
  }

}
