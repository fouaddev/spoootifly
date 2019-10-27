import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItuneAPIService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  searchMusic(url: string): Observable<any> {
    return this.http.jsonp(url, 'callback');
  }

  // getArtistInfo(url: string): Observable<any> {
  //   return this.http.jsonp(url, 'callback');
  // }
}
