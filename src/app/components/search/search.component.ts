import { Component, OnInit } from '@angular/core';
import { ItuneAPIService } from '../services/itune-api.service';
import { Artist } from '../../../../models/artist';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchStr: any;
  searchRes: Artist[];
  
  constructor(private ituneService: ItuneAPIService) {
    
  }

  ngOnInit() {
    if(localStorage.getItem('userSearch')) {
      this.searchRes = JSON.parse(localStorage.getItem('userSearch'));
    }
  }

  searchMusic(): any {
    
    var API = 'https://itunes.apple.com/search?term=' + this.searchStr;
    
    this.ituneService.searchMusic(API)
    .subscribe((musicData: any) => {
    
      let results: Artist[] = musicData.results;
      this.searchRes = results;

      localStorage.setItem('userSearch', JSON.stringify(this.searchRes));
    });
  }

}
