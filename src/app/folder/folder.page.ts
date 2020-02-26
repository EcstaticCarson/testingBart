import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  bartURL = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y';
  infoURL = 'http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=24th&key=MW9S-E7SL-26DU-VV8V&json=y';
  myKey = 'ZGR9-5QQ2-9W8T-DWE9';
  public station;
  public stationInfo;


  constructor(private activatedRoute: ActivatedRoute, private dataS: DataService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.folder !== 'home') {
      const scheduleURL = `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${this.folder}&key=MW9S-E7SL-26DU-VV8V&json=y`;
      const   infoURL = `  http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${this.folder}&key=MW9S-E7SL-26DU-VV8V&json=y`;
      console.log(infoURL);
      this.dataS.getURL(scheduleURL).subscribe(
        x => {
          this.station = x.root.station[0];
        }
      );
      this.dataS.getURL(infoURL).subscribe(
        x => {
          this.stationInfo = x.root.stations.station;
        }
      );
    }
  }

}
