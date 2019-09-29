import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {environment} from '../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
declare var jQuery: any;

@Component({
  selector: 'app-show-carousel',
  templateUrl: './show-carousel.component.html',
  styleUrls: ['./show-carousel.component.css']
})
export class ShowCarouselComponent implements OnInit {

  @Input() show: any;
  uploadsUrl: string = environment.uploadsUrl;
  imageUrl: string = this.uploadsUrl + 'shows/';
  @Output() clickedPlay: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.imageUrl += this.show.image;
    // this.initCarousel();
  }
  getSanitizedImageUrl() {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.imageUrl})`);
  }
  private initCarousel() {
    // setTimeout(function() {
    //   jQuery('.main-carousel').flickity({
    //     // options
    //     cellAlign: 'left',
    //     contain: true
    //   });
    // }, 500);

    jQuery('.main-carousel').flickity({
      // options
      cellAlign: 'left',
      contain: true
    });
  }

  showPlay(elemRef) {
    jQuery(elemRef).find('.tile-play').fadeIn();
  }

  hidePlay(elemRef) {
    jQuery(elemRef).find('.tile-play').fadeOut();
  }
  playChapter(chapter) {
    this.clickedPlay.emit({show: this.show, chapter});
  }
}
