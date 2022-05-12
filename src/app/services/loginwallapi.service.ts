import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallpaper } from '../interfaces/wallpaper';

const URL = "https://peapix.com/bing/feed";

@Injectable({
  providedIn: 'root'
})


export class LoginwallapiService {

  constructor(private http: HttpClient) {

  }

  getWallpaper(): Observable<Wallpaper[]> {
    const params = new HttpParams().set('country', 'es');
    return this.http.get<Wallpaper[]>(URL, {});
  }
}
