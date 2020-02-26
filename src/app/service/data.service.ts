import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  mainURL = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y';
  scheduleURL = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=RICH&key=MW9S-E7SL-26DU-VV8V&json=y';
  myKey = 'ZGR9-5QQ2-9W8T-DWE9';

  private stationList;
  private departList;
  private data: Data[] = [];
  private station;

  constructor(private http: HttpClient) {
    this.parseData();
   // this.scheduleMe();
  }
  // console.log(url);
  getURL(mainURL: string): Observable<any> {
    return this.http.get<any>(mainURL);
  }

  getStations() {
    return this.data;
  }

  // Parsing "url" data:
  parseData() {
    this.stationList = this.http.get<any>(this.mainURL);
    console.log(this.stationList.subscribe(
      x => {
        console.log(this.mainURL);
        for (const s of x.root.stations.station) {
          const info: Data = {
            name: s.name,
            url: '/folder/' + s.abbr,
            abbr: s.abbr,
            city: s.city,
            county: s.county,
            state: s.state,
          };
          this.data.push(info);
        }
        console.log(this.stationList);
      }
    ));
  }
}
