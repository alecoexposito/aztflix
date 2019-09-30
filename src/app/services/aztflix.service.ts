import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Chapter {
  number: number;
  name: string;
  title: string;
  path: string;
  image: string;
}

export class Show {
  name: string;
  description: string;
  image: string;
  chapters: Chapter[];
}

export class Channel {
  _id: string;
  name: string;
  logo: string;
  shows: Show[];
}

@Injectable({
  providedIn: 'root'
})
export class AztflixService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  getChannels(): Observable<object> {
    return this.http.get(this.baseUrl + '/channels/all');
  }
  getChannelById(id): Observable<any> {
    if(id)
      return this.http.get(this.baseUrl + '/channels/' + id);
    else
      return this.http.get(this.baseUrl + '/channels/' + 0);
  }

  getAds(): Observable<any> {
    return this.http.get(this.baseUrl + '/ads/all');
  }

  getChannelsIdAndName() {
    return this.http.get(this.baseUrl + '/channels/ids');
  }
}
