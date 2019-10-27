import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItuneAPIService } from '../services/itune-api.service';
import { Artist } from '../../../../models/artist';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  trackDetails: Artist;

  constructor(private route: ActivatedRoute, private ituneAPIService :ItuneAPIService) {

  }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      let trackId = params.trackId;
      let trackAPI = 'https://itunes.apple.com/lookup?id=' + trackId;
      'https://itunes.apple.com/lookup?id=1445316707&entity=song';
      this.ituneAPIService.searchMusic(trackAPI)
      .subscribe(trackResponse => {
        this.trackDetails = trackResponse.results[0];
      });
    });
  }

}
