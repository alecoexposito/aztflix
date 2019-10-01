import {Component, OnInit, ViewChild} from '@angular/core';
import {AztflixService, Channel, Chapter, Show} from '../services/aztflix.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {config, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

declare var jQuery: any;
var videoPlayer;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  channelObs$: Observable<any>;
  channel: any = new Channel();
  currentShow: Show = new Show();
  currentChapter: any = null;
  currentVideo: '';
  videoPlayer: any = null;
  playlist: any = [];
  ads: any = [];
  currentIndex = 0;
  uploadsUrl: string = environment.uploadsUrl;

  constructor(private service: AztflixService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.channelObs$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getChannelById(params.get('id')))
    );
    this.channelObs$.subscribe((data: any) => {
        jQuery('#video-id').html('');
        jQuery('#video-show').hide();
        const channel = data.data;
        for (let i = 0; i < channel.shows.length; i++) {
          channel.shows[i].chapters = this.orderChaptersByNumber(channel.shows[i]);
        }
        this.channel = channel;
        this.initCarousel();
    });
    this.service.getAds().subscribe((data: any) => {
      this.ads = data.ads;
    });
  }

  initCarousel() {
    const _this = this;

    setTimeout(() => {
      jQuery('.main-carousel').flickity({
        cellAlign: 'left',
        contain: true
      });
    }, 200);
  }

  onPlayClicked($event) {
    jQuery('#video-show').show();

    var config = null;
    this.currentChapter = $event.chapter;
    // if(this.currentShow !== $event.show) {
    this.currentShow = $event.show;
    console.log('before ordering: ', this.currentShow.chapters);
    console.log('after ordering: ', this.currentShow.chapters);
    this.currentIndex = this.currentShow.chapters.indexOf(this.currentChapter);
    config = this.initVideo(this.currentShow, this.currentIndex);
    jQuery('#video-id').html('');
    jQuery(document.body).animate({
      'scrollTop':   jQuery('#video-show').offset().top
    }, 500);

    window['videoPlayer'] = this.playVideo(config);
    window['videoPlayer'].play();
  }

  playVideo(config) {
    return jQuery('#video-id').Video(config);
  }

  initVideo(show, index = 0) {
    var playlist = this.getPlaylist(show);
    console.log('playlist: ', playlist);
    var config = {
      playerLayout: 'fitToContainer',
      // playlistBehaviourOnPageload: 'closed',
      // videoPlayerWidth: 768,
      // videoPlayerHeight: 432,
      playlist: 'Off',
      nowPlayingText: false,
      // autoplay: true,
      videos: playlist,
      playSpecificVideo: index,
      // HTML5VideoQuality: 'SD',
      advertisementTitle: 'Anuncio',
      skipAdvertisementText: 'Saltar anuncio',
      skipAdText: 'Puedes saltar este anuncio en',
      playBtnTooltipTxt: 'Play',
      pauseBtnTooltipTxt: 'Pausa',
      rewindBtnTooltipTxt: 'Ir atrás',
      downloadVideoBtnTooltipTxt: 'Descargar video',
      qualityBtnOpenedTooltipTxt: 'Cerrar calidad',
      qualityBtnClosedTooltipTxt: 'Seleccionar calidad',
      muteBtnTooltipTxt: 'Silenciar',
      unmuteBtnTooltipTxt: 'Con sonido',
      fullscreenBtnTooltipTxt: 'Pantalla completa',
      exitFullscreenBtnTooltipTxt: 'Salir de pantalla completa',
      infoBtnTooltipTxt: 'Mostrar info',
      embedBtnTooltipTxt: 'Embed',
      shareBtnTooltipTxt: 'Compartir',
      volumeTooltipTxt: 'Volumen',
      playlistBtnClosedTooltipTxt: 'Mostrar lista de reproducción',
      playlistBtnOpenedTooltipTxt: 'Esconder lista de reproducción',
      facebookBtnTooltipTxt: 'Compartir en Facebook',
      twitterBtnTooltipTxt: 'Compartir en Twitter',
      googlePlusBtnTooltipTxt: 'Compartir en Google+',
      nextBtnTooltipTxt: 'Siguiente video',
      previousBtnTooltipTxt: 'Video anterior',
      playlistSearchText: 'Buscar video ...',
      nextVideoInPlaylistText: 'Siguiente',
      autoplayNextVideoInPlaylistOn: 'Pasar automaticamente al siguiente video',
      autoplayNextVideoInPlaylistOff: 'No pasar automaticamente al siguiente video',
      shuffleBtnOnTooltipTxt: 'Activar aleatorio',
      shuffleBtnOffTooltipTxt: 'Desactivar aleatorio',
      embedWindowTitle2: 'Embeber en tu sitio:',
      embedWindowTitle3: 'Compartir este video:',
      copyTxt: 'Copiar',
      copiedTxt: 'Copiado!',
    };
    return config;
  }

  private getPlaylist(show: any) {
    var playlist = [];
    for (var i = 0; i < show.chapters.length; i++) {
      let videoConfig = this.getVideoConfig(show, i);
      playlist.push(videoConfig);
    }
    return playlist;
  }

  private getVideoConfig(show, pos) {
    var chapter = show.chapters[pos];
    var ads = this.getRandomAds(3);
    var videoConfig = {
      videoType: 'HTML5',
      title: 'Capitulo ' + chapter.number,
      description: chapter.title,
      info: chapter.title,
      // mp4HD: this.uploadsUrl + 'videos/' + chapter.path,
      mp4SD: this.uploadsUrl + 'videos/' + chapter.path,
      thumbImg: this.uploadsUrl + 'shows/' + show.image,
      prerollAD: true,
      prerollGotoLink: false,
      preroll_mp4: this.uploadsUrl + 'ads/' + ads[0],
      prerollSkipTimer: 5,
      midrollAD: true,
      midrollGotoLink: false,
      midroll_mp4: this.uploadsUrl + 'ads/' + ads[1],
      midrollAD_displayTime: '05:00',
      midrollSkipTimer: 5,
    };
    return videoConfig;
  }

  private orderByNumber(chapters: Chapter[]) {

  }

  private getRandomAds(amount: number) {
    var am = this.ads.length > amount ? this.ads.length : amount;
    var results = [];
    var min = 0;
    var max = this.ads.length - 1;
    while (results.length < amount) {
      var pos = Math.floor(Math.random() * (max - min + 1)) + min;
      let index = results.indexOf(this.ads[pos].path);
      if (index === -1) {
        results.push(this.ads[pos].path);
      }
    }
    console.log('random ads: ', results);
    return results;
  }

  private orderChaptersByNumber(show: Show) {
    var chapters = show.chapters;
    console.log('before order: ', chapters);
    for (var i = 0; i < chapters.length; i++) {
      for (var j = 0; j < chapters.length - 1; j++) {
        if (chapters[j].number > chapters[j + 1].number) {
          let tmp = chapters[j];
          chapters[j] = chapters[j + 1];
          chapters[j + 1] = tmp;
        }
      }
    }
    console.log('after order: ', chapters);
    return chapters;
  }

  playPrev() {
    var currentPos = window['videoPlayer']._playlist.videoid;
    console.log(currentPos);
    if (currentPos == 0) {
      return;
    }
    window['videoPlayer'].setPlaylistItem(--currentPos);
    window['videoPlayer'].playVideoById(currentPos);
    this.currentIndex = currentPos;
    console.log(currentPos);
  }

  playNext() {
    var currentPos = window['videoPlayer']._playlist.videoid;
    console.log(currentPos);
    if (currentPos === this.currentShow.chapters.length - 1) {
      return;
    }
    window['videoPlayer'].setPlaylistItem(++currentPos);
    window['videoPlayer'].playVideoById(currentPos);
    this.currentIndex = currentPos;
    console.log(currentPos);
  }
}
