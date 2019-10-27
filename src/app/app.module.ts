import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';

import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ArtistComponent } from './components/artist/artist.component';
import { TrackComponent } from './components/track/track.component';
import { CollectionComponent } from './components/collection/collection.component';

const appRoutes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'home', component: SearchComponent},
  {path: 'about', component: AboutComponent},
  {path: 'home/artist/:artistId', component: ArtistComponent},
  {path: 'home/album/:collectionId', component: CollectionComponent},
  {path: 'home/track/:trackId', component: TrackComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    SearchComponent,
    ArtistComponent,
    TrackComponent,
    CollectionComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {useHash:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
