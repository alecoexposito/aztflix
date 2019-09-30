import { Component, OnInit } from '@angular/core';
import {AztflixService} from '../services/aztflix.service';

declare var jQuery: any;

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
      setTimeout(() => {
        jQuery('.navbar-nav>li>a').on('click', function(){
          jQuery('.navbar-collapse').collapse('hide');
        });
      }, 300);
    });
  }

  collapseNavbar() {

  }
}
