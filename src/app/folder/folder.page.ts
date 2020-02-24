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
  scheduleURL = 'http://api.bart.gov/api/sched.aspx?cmd=depart&orig=ASHB&dest=CIVC&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1&json=y';

  constructor(private activatedRoute: ActivatedRoute, private dataS: DataService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataS.getURL(this.bartURL).subscribe(
      x => {
        console.log(x);
      }
    );
    this.dataS.getURL(this.scheduleURL).subscribe(
      x => {
        console.log(x);
      }
    );
  }

}
