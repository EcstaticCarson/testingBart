import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y';
  scheduleURL = 'http://api.bart.gov/api/sched.aspx?cmd=depart&orig=ASHB&dest=CIVC&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1&json=y';

  private stationList;
  private data: Data[] = [];

  constructor(private dService: DataService, private http: HttpClient) { this.parseData(); }
  // console.log(url);
  getURL(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  // Parsing "url" data:
  parseData() {
    this.stationList = this.http.get<any>(this.url);
    console.log(this.stationList.subscribe(
      x => {
        console.log(this.url);
        for (const s of x.root.stations.station) {
          const info: Data = {
            name: s.name,
            abbr: s.abbr,
            city: s.city,
            county: s.county,
            state: s.state,
            zipCode: s.zipCode,
            address: s.address,
          };
          this.data.push(info);
        }
        console.log(this.data);
      }
    ));
  }
  // parseSchedule() {
  //   this.
  // }
}
