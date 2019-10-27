import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItuneAPIService } from '../services/itune-api.service';
import { Artist } from '../../../../models/artist';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  album: Artist[];

  constructor(private route: ActivatedRoute, private ituneAPIService :ItuneAPIService) { }

  ngOnInit() {

    this.route.params
    .subscribe(params => {
      
      let albumId = params.collectionId;
      let albumAPI = 'https://itunes.apple.com/lookup?id=' + albumId + '&entity=song';
      
      this.ituneAPIService.searchMusic(albumAPI)
      .subscribe(trackResponse => {
        
        let tracks = trackResponse.results;
        tracks.forEach(track => {
          let startIndex = track.artworkUrl100.search('source') + 7;
          track.artworkUrl1000 = track.artworkUrl100.slice(0, startIndex) + '1000x1000bb.jpg';
        });
        
        this.album = tracks;
      });
    });
  }

}
