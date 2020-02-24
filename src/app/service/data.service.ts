import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y';

  constructor(private dService: DataService, private http: HttpClient) { }
  // console.log(url);
  getURL(url: string): Observable<any> {
    return this.http.get(url);
  }
}
