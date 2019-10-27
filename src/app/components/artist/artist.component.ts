import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItuneAPIService } from '../services/itune-api.service';
import { Artist } from '../../../../models/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  collections: Artist[];
  nameOfArtist: string;

  constructor(private route: ActivatedRoute, private ituneAPIService: ItuneAPIService) { }

  ngOnInit() {

    this.route.params
    .subscribe(params => {

      let id = params.artistId;
      let artistAPI = 'https://itunes.apple.com/lookup?id=' + id + '&entity=album';
      this.ituneAPIService.searchMusic(artistAPI)
      .subscribe(artistResponse => {
        
        let albums = artistResponse.results.slice(1, artistResponse.results.length);
        albums.forEach(album => {
          let startIndex = album.artworkUrl100.search('source') + 7;
          album.artworkUrl1000 = album.artworkUrl100.slice(0, startIndex) + '1000x1000bb.jpg';
        });
        
        this.collections = albums;
      })
    });
    
    // this.route.params
    // .subscribe((params) => {

    //   let id = params.artistId;
    //   let artistInfoUrl = 'https://itunes.apple.com/lookup?id=' + id;
      
    //   this.ituneAPIService.getArtistInfo(artistInfoUrl)
    //   .subscribe((artistInfo) => {
        
    //     this.nameOfArtist = artistInfo.results[0].artistName;
    //     let artistUrl = 'https://itunes.apple.com/search?term=' + this.nameOfArtist + '&entity=musicVideo';
        
    //     this.ituneAPIService.searchMusic(artistUrl)
    //     .subscribe((artistApiResponse: any) => {
    //       this.artist = artistApiResponse.results;
    //       console.log(this.artist);
    //     });
    //   });
    // });
  }

}
