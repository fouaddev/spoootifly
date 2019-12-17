import { Component, OnInit } from '@angular/core';
import { ItuneAPIService } from '../services/itune-api.service';
import { Artist } from '../../../../models/artist';

import { Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchStr: any;
  searchRes: Artist[];

  // Declares a subject to publish search terms
  private searchKeywords: Subject<string>;
  
  constructor(private ituneService: ItuneAPIService) {}

  ngOnInit() {
    if(localStorage.getItem('userSearch')) {
      this.searchRes = JSON.parse(localStorage.getItem('userSearch'));
    }

    // Initializes searchKeywords which is the Subject Observable declared above
    this.searchKeywords = new Subject<string>();

    // Starts the Subject Observable searchKeywords
    this.searchKeywords.pipe(
      // Waits 900 milliseconds after every keys-stroke before considering the term
      debounceTime(900),

      // Ignores the current term if it's the same as the previous one
      distinctUntilChanged(),
      
      // Makes the actual API call to iTune Search API passing term as argument to use its data in the API call
      switchMap((searchStr: any): any => {
        var API = 'https://itunes.apple.com/search?term=' + this.searchStr;

        return this.ituneService.searchMusic(API);
      })
    )
    .subscribe((musicData: any) => {
      let results: Artist[] = musicData.results;

      // Limits search results to 10 elements
      this.searchRes = results.slice(0, 10);
      
      localStorage.setItem('userSearch', JSON.stringify(this.searchRes));
    });
  } 

  musicSearch(searchStr: any): any {
    this.searchKeywords.next(this.searchStr);

    // var API = 'https://itunes.apple.com/search?term=' + this.searchStr;
    
    // this.ituneService.searchMusic(API)
    // .subscribe((musicData: any) => {
    
    //   let results: Artist[] = musicData.results;

    //   // Limits search results to 10 elements
    //   this.searchRes = results.slice(0, 10);

    //   localStorage.setItem('userSearch', JSON.stringify(this.searchRes));
    // });
  }

}
